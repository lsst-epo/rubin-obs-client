"server-only";
import { graphql } from "@/gql";
import queryAPI from "@/lib/api/client/query";
import tags from "@/lib/api/client/tags";
import { getSiteFromLocale } from "@/lib/helpers/site";
import { getLocale } from "next-intl/server";

const getFooter = async () => {
  const site = getSiteFromLocale(await getLocale());

  const query = graphql(`
    query getFooter($set: [String], $site: [String]) {
      footer: globalSet(handle: $set, site: $site) {
        ... on footer_GlobalSet {
          id
          name
          handle
          links {
            ...LinksFragment
          }
          colophon
          supportersLogos {
            ... on generalImages_Asset {
              altText
              width
              height
              url @transform(mode: "fit", width: 1000)
            }
          }
          supportersLogosAlt
        }
      }
    }
  `);

  const { data } = await queryAPI({
    query,
    variables: { site, set: "footer" },
    fetchOptions: {
      next: { tags: [tags.globals] },
    },
  });

  return data?.footer && data?.footer.__typename === "footer_GlobalSet"
    ? data.footer
    : undefined;
};

export default getFooter;
