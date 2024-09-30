import { gql } from "@urql/core";
import { fallbackLng } from "@/lib/i18n/settings";
import queryAPI from "@/lib/api/client/query";
import { linkFragment } from "@/lib/api/fragments/link";
import {
  siteInfoFragment,
  footerFragment,
  rootPageInfoFragment,
  contactFormFragment,
} from "@/lib/api/fragments/global";
import { categoriesFragment } from "@/lib/api/fragments/categories";
import { userProfileFragment } from "@/lib/api/fragments/page";
import { getSiteFromLocale } from "@/lib/helpers/site";
import tags from "../client/tags";

export async function getGlobalData(locale = fallbackLng) {
  const site = getSiteFromLocale(locale);
  const query = gql`
    ${linkFragment}
    ${siteInfoFragment}
    ${footerFragment}
    ${rootPageInfoFragment}
    ${contactFormFragment}
    ${categoriesFragment}
    ${userProfileFragment}
    query getGlobalData($site: [String]) {
      pageTree: entries(
        section: "pages"
        site: $site
        level: 1
        isVisible: true
      ) {
        id
        title
        uri
        children(isVisible: true) {
          id
          title
          uri
          children(isVisible: true) {
            id
            title
            uri
          }
        }
      }
      globals: globalSets(site: $site) {
        ...rootPageInfoFragment
        ...siteInfoFragment
        ...footerFragment
        ...contactFormFragment
      }
      allCategories: categories(site: $site) {
        ...categoriesFragment
      }
      userProfilePage: entry(site: $site, type: "userProfilePage") {
        ...userProfileFragment
      }
    }
  `;
  const { data } = await queryAPI({
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
    footerContent: globals?.footer || {},
    contactForm: globals?.contactForm || {},
    headerNavItems: data?.pageTree || [],
    rootPages: globals?.rootPageInformation?.customBreadcrumbs || [],
    siteInfo: globals?.siteInfo || {},
    userProfilePage: data?.userProfilePage || {},
    localeInfo: {
      language: locale,
      locale,
    },
  };
}
