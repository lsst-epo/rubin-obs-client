import { gql } from "graphql-request";
import { queryAPI } from "@/lib/fetch";
import { allPageBlocksFragment } from "@/api/fragments/content-blocks";

export async function getHomePageData(uri, site, previewToken) {
  const query = gql`
    ${allPageBlocksFragment}
    {
      entry (section: "homepage", site: "${site}") {
        id
        title
        language
        localized {
          uri
          language
        }
        ...on homepage_homepage_Entry {
          description
          pageType
          dynamicComponent
          contentBlocks {
            ...accordionGroupBlock
            ...calloutBlock
            ...contactBlock
            ...ctaGridBlock
            ...imageBlock
            ...linkBlock
            ...newsBlock
            ...relatedContentBlock
            ...scheduleBlock
            ...shareBlock
            ...slideBlock
            ...staffGridBlock
            ...textBlock
            ...videoBlock
          }
        }
      }
    }
  `;
  const data = await queryAPI(query, previewToken);
  return data.entry;
}
