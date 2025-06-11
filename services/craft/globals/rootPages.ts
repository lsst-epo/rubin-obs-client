"server-only";
import { graphql, useFragment } from "@/gql";
import queryAPI from "@/lib/api/client/query";
import { getSiteFromLocale } from "@/lib/helpers/site";
import { getLocale } from "next-intl/server";

export const RootPagesFragment = graphql(`
  fragment rootPageInfoFragment on rootPageInformation_GlobalSet {
    name
    handle
    customBreadcrumbs {
      ... on customBreadcrumbs_ancestorsAndRoot_BlockType {
        header
        pageEntry {
          id
          title
          uri
        }
      }
    }
  }
`);

const getRootPages = async () => {
  const site = getSiteFromLocale(await getLocale());

  const query = graphql(`
    query getRootPages($site: [String], $set: [String]) {
      rootPages: globalSet(handle: $set, site: $site) {
        ...rootPageInfoFragment
      }
    }
  `);

  const { data } = await queryAPI({
    query,
    variables: { site, set: "rootPageInformation" },
  });

  if (!data || data.rootPages?.__typename !== "rootPageInformation_GlobalSet")
    return undefined;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { customBreadcrumbs } = useFragment(RootPagesFragment, data.rootPages);

  return customBreadcrumbs || undefined;
};

export default getRootPages;
