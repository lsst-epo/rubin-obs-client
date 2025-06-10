"server-only";

import { graphql } from "@/gql";
import queryAPI from "@/lib/api/client/server";
import tags from "@/lib/api/client/tags";
import { getSiteFromLocale } from "@/lib/helpers/site";
import { getLocale } from "next-intl/server";

const getSocials = async () => {
  const site = getSiteFromLocale(await getLocale());

  const query = graphql(`
    query getSocials($set: [String], $site: [String]) {
      socials: globalSet(handle: $set, site: $site) {
        ... on siteInfo_GlobalSet {
          email
          facebook
          instagram
          linkedIn
          twitter
          youTube
        }
      }
    }
  `);

  const { data } = await queryAPI({
    query,
    variables: { site, set: "siteInfo" },
    fetchOptions: {
      next: { tags: [tags.globals] },
    },
  });

  return data?.socials && data.socials.__typename === "siteInfo_GlobalSet"
    ? data.socials
    : undefined;
};

export default getSocials;
