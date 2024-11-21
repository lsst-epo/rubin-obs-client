import { gql } from "@urql/core";
import queryAPI from "@/lib/api/client/query";

export async function getGalleryData(
    uri: string,
    searchParams: any
    // section: string,
    // type: string,
    // locale: string,
    // previewToken?: string
  ) {
    // const site = getSiteFromLocale(locale);
    // const query = getQueryFragments(uri, section, type, site);
    const query = getQuery(searchParams?.sort);
    console.info(query);

    const { data } = await queryAPI({
      query,
      variables : {},
    //   variables: {
    //     section,
    //     type,
    //     site,
    //     uri: decodeURI(uri),
    //   },
    //   previewToken,
    });

    // Get the related investigation
    // const entryWithRelatedData = await includeRelatedEntries(data.entry, site);
    return cleanUpQueryResponse(data);
  }

  function cleanUpQueryResponse(response) {
    return response?.entries.filter( e => Object.keys(e).length !== 0);
  }

  function getQuery(sort) {
    let sortArg = "";
    if (sort != undefined && sort != null) {
        if (sort == "asc") {
            sortArg = "(sortBy: \"default.DateCreated\")";
        } else {
            sortArg = "(sortByDesc: \"default.DateCreated\")";
        }
    }
    return gql`
    query MyQuery {
        entries {
            ... on galleryItems_galleryItem_Entry {
            id
            title
            albumAsGallery${sortArg} {
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
