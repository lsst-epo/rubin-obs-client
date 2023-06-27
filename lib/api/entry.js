import { gql } from "graphql-request";
import { queryAPI } from "@/lib/fetch";
import { fullBaseFieldsFragment } from "@/lib/api/fragments/shared";
import { linkFragment } from "@/lib/api/fragments/link";
import {
  allPageBlocksFragment,
  allNewsBlocksFragment,
} from "@/api/fragments/content-blocks";
import { eventFragmentFull } from "@/lib/api/fragments/event";
import { homepageFragmentFull } from "@/lib/api/fragments/homepage";
import { newsPostFragmentFull } from "@/lib/api/fragments/news-post";
import {
  pageFragmentFull,
  searchFragmentFull,
  userProfileFragmentFull,
  redirectFragment,
} from "@/lib/api/fragments/page";
import { staffProfileFragmentFull } from "@/lib/api/fragments/staff-profile";
import { glossaryTermFragmentFull } from "./fragments/glossary-term";
import { studentPageFragmentFull } from "./fragments/student-page";
import { educatorPageFragmentFull } from "./fragments/educator-page";
import { investigationLandingPageFragmentFull } from "./fragments/investigation-landing-page";
import { addRelatedInvestigation } from "./investigation";
import { addSiblings } from "./sibling-nav";

function entryQueryify(fragment) {
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

function getPageQueryFragmentsByType(uri, section, type, site) {
  let query = null;

  switch (type) {
    case "pages":
      query = gql`
        ${linkFragment}
        ${allPageBlocksFragment}
        ${pageFragmentFull}
        ${entryQueryify(`...pageFragmentFull`)}
      `;
      break;
    case "educatorPages":
      query = gql`
        ${linkFragment}
        ${allPageBlocksFragment}
        ${educatorPageFragmentFull}
        ${entryQueryify(`...educatorPageFragmentFull`)}
      `;
      break;
    case "studentPages":
      query = gql`
        ${linkFragment}
        ${allPageBlocksFragment}
        ${studentPageFragmentFull}
        ${entryQueryify(`...studentPageFragmentFull`)}
      `;
      break;
    case "investigationLandingPage":
      query = gql`
        ${linkFragment}
        ${allPageBlocksFragment}
        ${investigationLandingPageFragmentFull}
        ${entryQueryify(`...investigationLandingPageFragmentFull`)}
      `;
      break;
    case "redirectPage":
      query = gql`
        ${redirectFragment}
        ${entryQueryify(`...redirectFragment`)}
      `;
      break;
    default:
      query = gql`
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
      break;
  }

  return query;
}

function getQueryFragments(uri, section, type, site) {
  let query = null;

  switch (section) {
    case "homepage":
      query = gql`
        ${linkFragment}
        ${allPageBlocksFragment}
        ${homepageFragmentFull}
        ${entryQueryify(`...homepageFragmentFull`)}
      `;
      break;
    case "pages":
      query = getPageQueryFragmentsByType(uri, section, type, site);
      break;
    case "news":
      query = gql`
        ${allNewsBlocksFragment}
        ${newsPostFragmentFull}
        ${entryQueryify(`...newsPostFragmentFull`)}
      `;
      break;
    case "events":
      query = gql`
        ${linkFragment}
        ${allPageBlocksFragment}
        ${eventFragmentFull}
        ${entryQueryify(`...eventFragmentFull`)}
      `;
      break;
    case "staffProfiles":
      query = gql`
        ${allNewsBlocksFragment}
        ${staffProfileFragmentFull}
        ${entryQueryify(`...staffProfileFragmentFull`)}
      `;
      break;
    case "glossaryTerms":
      query = gql`
        ${glossaryTermFragmentFull}
        ${entryQueryify(`...glossaryTermFragmentFull`)}
      `;
      break;
    case "userProfilePage":
      query = gql`
        ${userProfileFragmentFull}
        ${entryQueryify(`...userProfileFragmentFull`)}
      `;
      break;
    case "searchResults":
      query = gql`
        ${searchFragmentFull}
        ${entryQueryify(`...searchFragmentFull`)}
      `;
      break;
    default:
      query = gql`
        ${linkFragment}
        ${allPageBlocksFragment}
        ${allNewsBlocksFragment}
        ${eventFragmentFull}
        ${homepageFragmentFull}
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
          ...homepageFragmentFull
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
      break;
  }

  return query;
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

export async function getEntrySectionTypeByUri(
  uri = "__home__",
  site = "default",
  previewToken
) {
  const query = gql`
    {
      entry (uri: "${uri}", site: "${site}") {
        sectionHandle
        typeHandle
      }
    }
  `;
  const data = await queryAPI(query, null, previewToken);
  return data.entry;
}

export async function getEntryDataByUri(
  uri,
  section,
  type,
  site = "default",
  previewToken
) {
  const query = getQueryFragments(uri, section, type, site);

  const data = await queryAPI(query, null, previewToken, {
    section,
    type,
    site,
    uri,
  });

  // Get the related investigation
  const entryWithRelatedData = await includeRelatedEntries(data.entry, site);

  return entryWithRelatedData;
}

export async function getEntryDataByUid(uid, site, previewToken) {
  const query = gql`
    {
      entry (uid: "${uid}" site: "${site}") {
        url
        uri
      }
    }
  `;
  const data = await queryAPI(query, null, previewToken);
  return data.entry;
}
