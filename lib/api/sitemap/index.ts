import { gql } from "@urql/core";
import { env } from "@/env";
import { getSiteFromLocale } from "@/lib/helpers/site";
import queryAPI from "@/lib/api/client/query";
import tags from "@/lib/api/client/tags";
import { CRAFT_HOMEPAGE_URI } from "@/lib/constants";
import { fallbackLng, languages } from "@/lib/i18n/settings";
import { graphql } from "@/gql/gql";

interface PageMetadata {
  uri: string;
  dateUpdated: string;
}
const baseUrl = env.NEXT_PUBLIC_BASE_URL;

export const generateSitemapUrl = (
  uri: string,
  locale: string,
  preserveLocale = false
) => {
  const segments =
    uri === CRAFT_HOMEPAGE_URI ? [] : uri.split("/").map(encodeURIComponent);

  if (preserveLocale || locale !== fallbackLng) {
    segments.unshift(locale);
  }

  segments.unshift(baseUrl);

  return segments.join("/");
};

export const generateAlternateLanguages = (uri: string, locale: string) => {
  return languages
    .filter((language) => language !== locale)
    .map((language) => {
      return {
        $rel: "alternate",
        $hreflang: language,
        $href: generateSitemapUrl(uri, language),
      };
    }, {});
};

export const getSitemapNewsData = async (locale: string) => {
  const site = getSiteFromLocale(locale);

  const query = gql`
    query NewsSitemapData($site: [String]) {
      newsEntries(site: $site) {
        ... on news_post_Entry {
          title
          uri
          date
          dateUpdated
        }
      }
      globalSets(site: $site) {
        ... on siteInfo_GlobalSet {
          siteTitle
        }
      }
    }
  `;

  const { data } = await queryAPI({
    query,
    variables: { site },
    fetchOptions: {
      next: { tags: [tags.globals] },
    },
  });

  const { newsEntries, globalSets } = data;
  const { siteTitle } = globalSets.filter((set) =>
    Object.hasOwn(set, "siteTitle")
  )[0];

  return { siteTitle, news: newsEntries };
};

export const getSitemapGalleryData = async (locale: string) => {
  const site = getSiteFromLocale(locale);

  const query = graphql(`
    query ImageSitemapData($site: [String]) {
      galleries: galleriesEntries(site: $site) {
        ... on galleries_gallery_Entry {
          uri
          dateUpdated
          assetAlbum(
            whereIn: { key: "scheme", values: ["image", "video", "document"] }
          ) {
            id
            scheme
            url {
              directUrlOriginal
            }
          }
        }
      }
    }
  `);

  const { data } = await queryAPI({
    query,
    variables: { site },
    fetchOptions: {
      next: { tags: [tags.globals] },
    },
  });

  return data;
};

export const getSitemapData = async (
  locale: string
): Promise<Array<PageMetadata> | undefined> => {
  const site = getSiteFromLocale(locale);

  const query = graphql(`
    query SitemapData($site: [String]) {
      pages: entries(
        site: $site
        section: ["pages"]
        type: ["not", "redirectPage"]
      ) {
        uri
        dateUpdated
      }
      homepage: homepageEntries(site: $site) {
        ... on homepage_homepage_Entry {
          uri
          dateUpdated
        }
      }
      staff: staffProfilesEntries(site: $site) {
        ... on staffProfiles_staffProfiles_Entry {
          dateUpdated
          uri
        }
      }
      slideshows: slideshowsEntries(site: $site) {
        ... on slideshows_slideshow_Entry {
          dateUpdated
          uri
        }
      }
      glossary: glossaryTermsEntries(site: $site) {
        ... on glossaryTerms_glossaryTerm_Entry {
          dateUpdated
          uri
        }
      }
    }
  `);

  const { data } = await queryAPI({
    query,
    variables: { site },
    fetchOptions: {
      next: { tags: [tags.globals] },
    },
  });

  return data ? Object.values<any>(data).flat() : undefined;
};
