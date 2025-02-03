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

  const query = graphql(`
    query getNavigationItems($site: [String]) {
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
      galleriesEntries(site: $site, isVisible: true) {
        ... on galleries_gallery_Entry {
          id
          title
          uri
        }
      }
    }
  `);

  const { data } = await queryAPI({
    query,
    variables: { site },
    fetchOptions: { next: { tags: [tags.globals] } },
  });

  if (!data || !data.navigationItems) return [];

  const { navigationItems, galleriesEntries } = data;

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
