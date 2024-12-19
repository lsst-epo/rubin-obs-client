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
import { getSiteFromLocale } from "@/lib/helpers/site";
import tags from "../client/tags";
import { getImageProps } from "next/image";
import { cantoToImageProps } from "../canto";

export async function getLogos() {
  const query = gql`
    query getLogos($set: [String]) {
      siteInfo: globalSet(handle: $set) {
        ... on siteInfo_GlobalSet {
          logoLarge {
            url {
              directUrlPreview
            }
            width
            height
          }
          logoSmall {
            url {
              directUrlPreview
            }
            width
            height
          }
        }
      }
    }
  `;

  const { data } = await queryAPI({
    query,
    variables: { set: "siteInfo" },
    fetchOptions: { next: { tags: [tags.globals], revalidate: 60 * 60 } },
  });

  if (!data || !data.siteInfo) {
    return undefined;
  }

  const {
    siteInfo: { logoLarge, logoSmall },
  } = data;

  const { props: large } = getImageProps({
    ...cantoToImageProps(logoLarge[0], { usePreviewUrl: true }),
    priority: true,
    quality: 90,
  });

  if (logoSmall[0]) {
    const { props: small } = getImageProps({
      ...cantoToImageProps(logoSmall[0], { usePreviewUrl: true }),
      priority: true,
      quality: 90,
    });

    return {
      large,
      small,
    };
  }

  return {
    large,
  };
}

export async function getNavigationItems(
  locale = fallbackLng
): Promise<Array<InternalLinkWithChildren>> {
  const site = getSiteFromLocale(locale);

  const query = gql`
    query getNavigationItems($site: [String]) {
      navigationItems: entries(
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
    }
  `;

  const { data } = await queryAPI({
    query,
    variables: { site },
    fetchOptions: { next: { tags: [tags.globals] } },
  });

  return data?.navigationItems || [];
}

export async function getGlobalData(locale = fallbackLng) {
  const site = getSiteFromLocale(locale);
  const query = gql`
    ${linkFragment}
    ${siteInfoFragment}
    ${footerFragment}
    ${rootPageInfoFragment}
    ${contactFormFragment}
    ${categoriesFragment}
    query getGlobalData($site: [String]) {
      globals: globalSets(site: $site) {
        ...rootPageInfoFragment
        ...siteInfoFragment
        ...footerFragment
        ...contactFormFragment
      }
      allCategories: categories(site: $site) {
        ...categoriesFragment
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
    rootPages: globals?.rootPageInformation?.customBreadcrumbs || [],
    siteInfo: globals?.siteInfo || {},
    localeInfo: {
      language: locale,
      locale,
    },
  };
}
