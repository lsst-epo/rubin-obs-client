import { gql } from "@urql/core";
import queryAPI from "@/lib/api/client/query";
import { fullBaseFieldsFragment } from "@/lib/api/fragments/shared";
import { linkFragment } from "@/lib/api/fragments/link";
import {
  allPageBlocksFragment,
  allNewsBlocksFragment,
} from "@/api/fragments/content-blocks";
import { eventFragmentFull } from "@/lib/api/fragments/event";
import { newsPostFragmentFull } from "@/lib/api/fragments/news-post";
import {
  pageFragmentFull,
  searchFragmentFull,
  userProfileFragmentFull,
  redirectFragment,
} from "@/lib/api/fragments/page";
import { staffProfileFragmentFull } from "@/lib/api/fragments/staff-profile";
import { glossaryTermFragmentFull } from "@/lib/api/fragments/glossary-term";
import { studentPageFragmentFull } from "@/lib/api//fragments/student-page";
import { educatorPageFragmentFull } from "@/lib/api//fragments/educator-page";
import { investigationLandingPageFragmentFull } from "@/lib/api//fragments/investigation-landing-page";
import { addRelatedInvestigation } from "@/lib/api//investigation";
import { addSiblings } from "@/lib/api//sibling-nav";
import { getSiteFromLocale } from "../../helpers/site";

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
      return gql`
        ${linkFragment}
        ${allPageBlocksFragment}
        ${pageFragmentFull}
        ${entryQueryify(`...pageFragmentFull`)}
      `;
    case "educatorPages":
      return gql`
        ${linkFragment}
        ${allPageBlocksFragment}
        ${educatorPageFragmentFull}
        ${entryQueryify(`...educatorPageFragmentFull`)}
      `;
    case "studentPages":
      return gql`
        ${linkFragment}
        ${allPageBlocksFragment}
        ${studentPageFragmentFull}
        ${entryQueryify(`...studentPageFragmentFull`)}
      `;
    case "investigationLandingPage":
      return gql`
        ${linkFragment}
        ${allPageBlocksFragment}
        ${investigationLandingPageFragmentFull}
        ${entryQueryify(`...investigationLandingPageFragmentFull`)}
      `;
    case "redirectPage":
      return gql`
        ${redirectFragment}
        ${entryQueryify(`...redirectFragment`)}
      `;
    default:
      return gql`
        ${linkFragment}
        ${allPageBlocksFragment}
        ${pageFragmentFull}
        ${studentPageFragmentFull}
        ${educatorPageFragmentFull}
        ${investigationLandingPageFragmentFull}
        ${redirectFragment}
        ${entryQueryify(`
          ...pageFragmentFull
          ...studentPageFragmentFull
          ...educatorPageFragmentFull
          ...investigationLandingPageFragmentFull
          ...redirectFragment
        `)}
      `;
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
      return gql`
        ${allNewsBlocksFragment}
        ${newsPostFragmentFull}
        ${entryQueryify(`...newsPostFragmentFull`)}
      `;
    case "events":
      return gql`
        ${linkFragment}
        ${allPageBlocksFragment}
        ${eventFragmentFull}
        ${entryQueryify(`...eventFragmentFull`)}
      `;
    case "staffProfiles":
      return gql`
        ${allNewsBlocksFragment}
        ${staffProfileFragmentFull}
        ${entryQueryify(`...staffProfileFragmentFull`)}
      `;
    case "glossaryTerms":
      return gql`
        ${glossaryTermFragmentFull}
        ${entryQueryify(`...glossaryTermFragmentFull`)}
      `;
    case "userProfilePage":
      return gql`
        ${userProfileFragmentFull}
        ${entryQueryify(`...userProfileFragmentFull`)}
      `;
    case "searchResults":
      return gql`
        ${searchFragmentFull}
        ${entryQueryify(`...searchFragmentFull`)}
      `;
    default:
      return gql`
        ${linkFragment}
        ${allPageBlocksFragment}
        ${allNewsBlocksFragment}
        ${eventFragmentFull}
        ${newsPostFragmentFull}
        ${pageFragmentFull}
        ${studentPageFragmentFull}
        ${searchFragmentFull}
        ${staffProfileFragmentFull}
        ${glossaryTermFragmentFull}
        ${educatorPageFragmentFull}
        ${userProfileFragmentFull}
        ${investigationLandingPageFragmentFull}
        ${redirectFragment}
        ${entryQueryify(`
          ...eventFragmentFull
          ...newsPostFragmentFull
          ...pageFragmentFull
          ...studentPageFragmentFull
          ...educatorPageFragmentFull
          ...searchFragmentFull
          ...staffProfileFragmentFull
          ...glossaryTermFragmentFull
          ...userProfileFragmentFull
          ...investigationLandingPageFragmentFull
          ...redirectFragment
        `)}
      `;
  }
}

async function includeRelatedEntries(entry, site) {
  const entryData = Object.assign({}, entry);
  const withRelatedEntries = await Promise.all([
    await addRelatedInvestigation(entryData, site),
    await addSiblings(entryData, site),
  ]).then(() => {
    return entryData;
  });

  return withRelatedEntries;
}

export async function getEntryDataByUri(
  uri: string,
  section: string,
  type: string,
  locale: string,
  previewToken?: string
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
    previewToken,
  });

  // Get the related investigation
  const entryWithRelatedData = await includeRelatedEntries(data.entry, site);
  return entryWithRelatedData;
}