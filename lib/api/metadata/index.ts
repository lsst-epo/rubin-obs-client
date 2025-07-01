import queryAPI from "@/lib/api/client/server";
import { getSiteFromLocale } from "@/lib/helpers/site";
import { fallbackLng } from "@/lib/i18n/settings";
import { graphql } from "@/gql";

export async function getEntryMetadataByUri(uri: string, locale = fallbackLng) {
  const site = getSiteFromLocale(locale);

  const query = graphql(`
    query EntryMetadata($site: [String], $uri: [String]) {
      entry(site: $site, uri: $uri) {
        ... on homepage_homepage_Entry {
          title
          description
        }
        ... on events_events_Entry {
          title
          description
          image: hero {
            ... on heroes_Asset {
              altText
              width
              height
              url @transform(mode: "crop", width: 1200, height: 630)
            }
          }
        }
        ... on pages_pages_Entry {
          title
          description
          image: hero {
            ... on heroes_Asset {
              altText
              width
              height
              url @transform(mode: "crop", width: 1200, height: 630)
            }
          }
        }
        ... on pages_educatorPages_Entry {
          description
          title
        }
        ... on pages_studentPages_Entry {
          description
          title
        }
        ... on pages_investigationLandingPage_Entry {
          description
          title
        }
        ... on news_post_Entry {
          postType {
            slug
          }
          pressReleaseId
          description: teaser
          title
          image: hero {
            ... on heroes_Asset {
              altText
              width
              height
              url @transform(mode: "crop", width: 1200, height: 630)
            }
          }
        }
        ... on glossaryTerms_glossaryTerm_Entry {
          title
          cantoAssetSingle {
            ...CantoAssetSingle
          }
        }
        ... on searchResults_searchResults_Entry {
          title
        }
        ... on slideshows_slideshow_Entry {
          title
          description: richTextDescription
          image: representativeAssetVariant {
            ... on assetVariants_Asset {
              altText
              width
              height
              url @transform(mode: "crop", width: 600, height: 400)
            }
          }
        }
        ... on staffProfiles_staffProfiles_Entry {
          title
          description: pullQuote
          image: staffPortrait {
            ... on staffProfiles_Asset {
              altText
              width
              height
              url @transform(mode: "crop", width: 800, height: 600)
            }
          }
        }
      }
    }
  `);

  const { data } = await queryAPI({
    query,
    variables: { site, uri: decodeURI(uri) },
  });

  return data;
}

export async function getBreadcrumbsById(id: number, locale: string) {
  if (!id) return null;
  const site = getSiteFromLocale(locale);

  const query = graphql(`
    query EntryBreadcrumbs($site: [String], $id: Int) {
      entries(section: "pages", site: $site, ancestorOf: $id) {
        id
        title
        uri
      }
    }
  `);
  const { data } = await queryAPI({
    query,
    variables: { site, id },
  });
  return data?.entries;
}
