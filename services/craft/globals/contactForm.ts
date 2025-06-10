"server-only";
import { graphql } from "@/gql";
import queryAPI from "@/lib/api/client/server";
import tags from "@/lib/api/client/tags";
import { getSiteFromLocale } from "@/lib/helpers/site";
import { getLocale } from "next-intl/server";

const getContactForm = async () => {
  const site = getSiteFromLocale(await getLocale());

  const query = graphql(`
    query getContactForm($set: [String], $site: [String]) {
      contactForm: globalSet(handle: $set, site: $site) {
        ... on contactForm_GlobalSet {
          contactFormTopics {
            ... on contactFormTopics_topic_BlockType {
              id
              value: topicValue
              label: topicLabel
            }
          }
        }
      }
    }
  `);

  const { data } = await queryAPI({
    query,
    variables: { site, set: "contactForm" },
    fetchOptions: {
      next: { tags: [tags.globals] },
    },
  });

  return data?.contactForm &&
    data?.contactForm.__typename === "contactForm_GlobalSet"
    ? data.contactForm
    : undefined;
};

export default getContactForm;
