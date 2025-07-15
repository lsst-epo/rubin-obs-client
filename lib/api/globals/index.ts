import { graphql } from "@/gql";
import { fallbackLng } from "@/lib/i18n/settings";
import queryAPI from "@/lib/api/client/server";
import { getSiteFromLocale } from "@/lib/helpers/site";
import tags from "../client/tags";

export async function getGlobalData(locale = fallbackLng) {
  const site = getSiteFromLocale(locale);
  const query = graphql(`
    query getGlobalData($site: [String]) {
      globals: globalSets(site: $site) {
        ...rootPageInfoFragment
        ...SiteInfoFragment
      }
      allCategories: categories(site: $site) {
        ...CategoriesFragment
      }
    }
  `);
  const { data } = await queryAPI({
    query,
    variables: { site },
    fetchOptions: { next: { tags: [tags.globals] } },
  });

  const globals = data?.globals
    ? data.globals.reduce(
        (prev, current) => {
          if (current === null) return prev;

          return Object.assign(
            prev,
            Object.keys(current).length && { [current?.handle]: current }
          );
        },

        {}
      )
    : {};

  return {
    categories: data?.allCategories || [],
    rootPages: globals?.rootPageInformation?.customBreadcrumbs || [],
    siteInfo: globals?.siteInfo || {},
    localeInfo: {
      language: locale,
      locale,
    },
  };
}
