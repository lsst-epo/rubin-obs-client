import useSWR from "swr";
import { gql } from "graphql-request";
import { queryAPI } from "@/lib/fetch";
import { linkFragment } from "@/lib/api/fragments/link";
import {
  siteInfoFragment,
  footerFragment,
  rootPageInfoFragment,
  contactFormFragment,
} from "@/lib/api/fragments/global";
import { categoriesFragment } from "@/lib/api/fragments/categories";
import { userProfileFragment } from "@/lib/api/fragments/page";
export async function getGlobalData() {
  const query = gql`
    ${linkFragment}
    ${siteInfoFragment}
    ${footerFragment}
    ${rootPageInfoFragment}
    ${contactFormFragment}
    ${categoriesFragment}
    ${userProfileFragment}
    {
      pageTree: entries(
        section: "pages"
        site: "default"
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
      globals: globalSets(site: "default") {
        ...rootPageInfoFragment
        ...siteInfoFragment
        ...footerFragment
        ...contactFormFragment
      }
      allCategories: categories(site: "default") {
        ...categoriesFragment
      }
      userProfilePage: entry(site: "default", type: "userProfilePage") {
        ...userProfileFragment
      }
      pageTree_es: entries(
        section: "pages"
        site: "es"
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
      globals_es: globalSets(site: "es") {
        ...rootPageInfoFragment
        ...siteInfoFragment
        ...footerFragment
        ...contactFormFragment
      }
      allCategories_es: categories(site: "es") {
        ...categoriesFragment
      }
      userProfilePage_es: entry(site: "es", type: "userProfilePage") {
        ...userProfileFragment
      }
    }
  `;
  const data = await queryAPI(query);
  return data;
}

export function useGlobalData() {
  const { data, error } = useSWR(
    gql`
      ${linkFragment}
      ${siteInfoFragment}
      ${footerFragment}
      ${userProfileFragment}
      {
        pageTree: entries(
          section: "pages"
          site: "default"
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
        globals: globalSets(site: "default") {
          ...siteInfoFragment
          ...footerFragment
        }
        userProfilePage: entry(site: "default", type: "userProfilePage") {
          ...userProfileFragment
        }
        pageTree_es: entries(
          section: "pages"
          site: "es"
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
        globals_es: globalSets(site: "es") {
          ...siteInfoFragment
          ...footerFragment
        }
        userProfilePage_es: entry(site: "es", type: "userProfilePage") {
          ...userProfileFragment
        }
      }
    `,
    queryAPI
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
