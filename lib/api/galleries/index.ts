import { gql } from "@urql/core";
import { graphql } from "@/gql/gql";
import queryAPI from "@/lib/api/client/query";
import { getSiteFromLocale } from "@/lib/helpers/site";

export async function getAllGalleries(locale: string) {
  const site = getSiteFromLocale(locale);

  const query = graphql(`
    query AllGalleriesQuery($site: [String]) {
      galleriesEntries(site: $site) {
        ... on galleries_gallery_Entry {
          slug
        }
      }
    }
  `);

  const { data } = await queryAPI({ query, variables: { site } });
  const galleries: Array<{ gallery: string }> = [];

  data?.galleriesEntries?.forEach((gallery) => {
    if (gallery && gallery.slug) {
      galleries.push({ gallery: gallery.slug });
    }
  });

  return galleries;
}

export async function getGalleryData(
  uri: string,
  locale: string,
  searchParams: any
  // section: string,
  // type: string,
  // locale: string,
  // previewToken?: string
) {
  const site = getSiteFromLocale(locale);
  // const site = getSiteFromLocale(locale);
  // const query = getQueryFragments(uri, section, type, site);
  const query = getQuery(searchParams?.sort);
  console.info(query);

  const { data } = await queryAPI({
    query,
    variables: {},
  });

  // Get the related investigation
  // const entryWithRelatedData = await includeRelatedEntries(data.entry, site);
  return cleanUpQueryResponse(data);
}

function cleanUpQueryResponse(response) {
  return response?.entries.filter((e) => Object.keys(e).length !== 0);
}

function getQuery(sort) {
  let sortArg = "";
  if (sort !== undefined && sort != null) {
    if (sort === "asc") {
      sortArg = '(sortBy: "default.DateCreated")';
    } else {
      sortArg = '(sortByDesc: "default.DateCreated")';
    }
  }
  return gql`
    query MyQuery {
        entries {
            ... on galleries_gallery_Entry {
            id
            title
            assetAlbum${sortArg} {
                id
                approvalStatus
                owner
                size
                smartTags
                url {
                HighJPG
                }
                additional {
                AltTextEN
                AltTextES
                CaptionEN
                CaptionES
                Credit
                Description
                }
                default {
                DateCreated
                Author
                Copyright
                }
            }
            }
        }
    }`;
}
