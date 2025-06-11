import { gql } from "@urql/core";
import { print } from "graphql";
import {
  RootPageInfoFragmentFragmentDoc,
  SiteInfoFragmentFragmentDoc,
} from "@/gql/graphql";
import { fallbackLng } from "@/lib/i18n/settings";
import queryAPI from "@/lib/api/client/query";
import { categoriesFragment } from "@/lib/api/fragments/categories";
import { getSiteFromLocale } from "@/lib/helpers/site";
import tags from "../client/tags";

export async function getGlobalData(locale = fallbackLng) {
  const site = getSiteFromLocale(locale);
  const query = gql`
    ${print(SiteInfoFragmentFragmentDoc)}
    ${print(RootPageInfoFragmentFragmentDoc)}
    ${categoriesFragment}
    query getGlobalData($site: [String]) {
      globals: globalSets(site: $site) {
        ...rootPageInfoFragment
        ...SiteInfoFragment
      }
      allCategories: categories(site: $site) {
        ...categoriesFragment
      }
    }
  `;
  const { data, error } = await queryAPI({
    query,
    variables: { site },
    fetchOptions: { next: { tags: [tags.globals] } },
  });

  const globals = data.globals
    ? data.globals.reduce(
        (prev, current) =>
          Object.assign(
            prev,
            Object.keys(current).length && { [current.handle]: current }
          ),
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
