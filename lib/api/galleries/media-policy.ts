import { graphql } from "@/gql/gql";
import queryAPI from "@/lib/api/client/query";
import { getSiteFromLocale } from "@/lib/helpers/site";

export const getMediaPolicyPage = async (locale: string) => {
  const site = getSiteFromLocale(locale);

  const query = graphql(`
    query MediaPolicyPage($site: [String]) {
      pagesEntries(site: $site, slug: "media-policy") {
        ... on pages_pages_Entry {
          __typename
          uri
          title
        }
      }
    }
  `);

  const { data } = await queryAPI({ query, variables: { site } });

  if (!data || !data.pagesEntries || !data.pagesEntries[0]) return;

  const [mediaPolicyPage] = data.pagesEntries;

  if (mediaPolicyPage.__typename !== "pages_pages_Entry") return;

  const { uri, title } = mediaPolicyPage;

  if (uri === null || title === null) return;

  return { uri, title };
};
