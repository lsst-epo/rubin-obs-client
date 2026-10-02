import z from "zod";
import { graphql } from "@/gql/gql";
import { fallbackLng } from "@/lib/i18n/settings";
import queryAPI from "@/lib/api/client/query";
import { getSiteFromLocale } from "@/lib/helpers/site";
import tags from "../client/tags";
import { serverTranslation } from "@/lib/i18n";

const internalLink = z.object({
  id: z.string(),
  title: z.string(),
  uri: z.string().optional(),
});

const internalLinks = z.array(internalLink);

const internalLinkWithChildren = internalLink.extend({
  children: internalLinks,
});

const topLevelLinkWithChildren = internalLinkWithChildren.extend({
  children: z.array(internalLinkWithChildren),
});

const navigationStructure = z.array(topLevelLinkWithChildren);

export async function getNavigationItems(
  locale = fallbackLng
): Promise<Array<InternalLinkWithChildren>> {
  const site = getSiteFromLocale(locale);
  const { t } = await serverTranslation(locale);
  console.info("logging site in navigation: ", site);
  const query = graphql(`
    query getNavigationItems(
      $site: [String]
      $includeFallback: Boolean = false
    ) {
      navigationItems: entries(
        section: ["pages"]
        site: $site
        level: 1
        isVisible: true
      ) {
        id
        title
        uri
        children(isVisible: true) {
          id
          title
          uri
          children(isVisible: true) {
            id
            title
            uri
          }
        }
      }
      fallbackNavigationItems: entries(
        section: ["pages"]
        site: "default"
        level: 1
        isVisible: true
      ) @include(if: $includeFallback) {
        id
        title
        uri
        children(isVisible: true) {
          id
          title
          uri
          children(isVisible: true) {
            id
            title
            uri
          }
        }
      }
      galleriesEntries(site: $site, isVisible: true) {
        ... on galleries_gallery_Entry {
          id
          title
          uri
        }
      }
    }
  `);

  const includeFallback = site !== "default";

  const { data } = await queryAPI({
    query,
    variables: { site, includeFallback },
    fetchOptions: { next: { tags: [tags.globals] } },
  });

  if (!data || !data.navigationItems) return [];

  console.info("logging data: ", data.navigationItems[0].children);

  let { navigationItems, galleriesEntries } = data;

  if (includeFallback) {
    navigationItems = mergeFallbackNavigation(
      data.fallbackNavigationItems,
      data.navigationItems
    );
  }

  const { data: structure = [] } =
    navigationStructure.safeParse(navigationItems);

  const galleryIndex = structure.findIndex((item) => item.uri === "gallery");

  if (galleryIndex > -1) {
    const { data: galleries = [] } = internalLinks.safeParse(galleriesEntries);

    if (galleries.length > 0) {
      structure[galleryIndex].children.unshift({
        id: "collections",
        title: t("gallery.collections"),
        children: galleries,
      });
    }
  }

  return structure;
}

function mergeFallbackNavigation(fallback, navigation) {
  for (const fallbackItem of fallback) {
    const item = navigation.find(({ uri }) => uri === fallbackItem.uri);

    if (!item) {
      navigation.push(fallbackItem);
      continue;
    }

    if (fallbackItem.children?.length) {
      item.children ??= [];

      mergeFallbackNavigation(fallbackItem.children, item.children);
    }
  }

  return navigation;
}
