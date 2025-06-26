import { gql } from "@urql/core";
import queryAPI from "@/lib/api/client/query";
import { fullBaseFieldsFragment } from "@/lib/api/fragments/shared";
import { allPageBlocksFragment } from "@/api/fragments/content-blocks";
import { redirectFragment } from "@/lib/api/fragments/page";
import { glossaryTermFragmentFull } from "@/lib/api/fragments/glossary-term";
import { studentPageFragmentFull } from "@/lib/api/fragments/student-page";
import { investigationLandingPageFragmentFull } from "@/lib/api/fragments/investigation-landing-page";
import { addRelatedInvestigation } from "@/services/craft/investigations";
import { getSiteFromLocale } from "../../helpers/site";
import { cantoAssetSingleFragment } from "../fragments/image";
import NewsPostQuery from "@/services/craft/entries/news";
import StaffProfileQuery from "@/services/craft/entries/staffProfile";
import PageQuery from "@/services/craft/entries/page";
import EducatorPageQuery from "@/services/craft/entries/educatorPage";
import EventQuery from "@/services/craft/entries/event";

function entryQueryify(fragment: string) {
  return gql`
    ${fullBaseFieldsFragment}
    query getEntry(
      $section: [String]
      $type: [String]
      $site: [String]
      $uri: [String]
    ) {
    entry(section: $section, type: $type, site: $site, uri: $uri) {
      ...fullBaseFieldsFragment
      ${fragment}
    }
  }`;
}

function getPageQueryFragmentsByType(type: string) {
  switch (type) {
    case "pages":
      return PageQuery;
    case "educatorPages":
      return EducatorPageQuery;
    case "studentPages":
      return gql`
        ${cantoAssetSingleFragment}
        ${allPageBlocksFragment}
        ${studentPageFragmentFull}
        ${entryQueryify(`...studentPageFragmentFull`)}
      `;
    case "investigationLandingPage":
      return gql`
        ${cantoAssetSingleFragment}
        ${allPageBlocksFragment}
        ${investigationLandingPageFragmentFull}
        ${entryQueryify(`...investigationLandingPageFragmentFull`)}
      `;
    case "redirectPage":
      return gql`
        ${cantoAssetSingleFragment}
        ${redirectFragment}
        ${entryQueryify(`...redirectFragment`)}
      `;
    default:
      return PageQuery;
  }
}

function getQueryFragments(
  uri: string,
  section: string,
  type: string,
  site: string
) {
  switch (section) {
    case "pages":
      return getPageQueryFragmentsByType(type);
    case "news":
      return NewsPostQuery;
    case "events":
      return EventQuery;
    case "staffProfiles":
      return StaffProfileQuery;
    case "glossaryTerms":
      return gql`
        ${glossaryTermFragmentFull}
        ${entryQueryify(`...glossaryTermFragmentFull`)}
      `;
    default:
      return gql`
        ${allPageBlocksFragment}
        ${studentPageFragmentFull}
        ${glossaryTermFragmentFull}
        ${investigationLandingPageFragmentFull}
        ${redirectFragment}
        ${entryQueryify(`
          ...studentPageFragmentFull
          ...glossaryTermFragmentFull
          ...investigationLandingPageFragmentFull
          ...redirectFragment
        `)}
      `;
  }
}

export async function getEntryDataByUri(
  uri: string,
  section: string,
  type: string,
  locale: string
) {
  const site = getSiteFromLocale(locale);
  const query = getQueryFragments(uri, section, type, site);

  const { data } = await queryAPI({
    query,
    variables: {
      section,
      type,
      site,
      uri: decodeURI(uri),
    },
  });

  // Get the related investigation
  return { ...data?.entry, ...(await addRelatedInvestigation(data?.entry)) };
}
