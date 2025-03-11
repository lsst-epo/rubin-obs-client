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
import { pageFragmentFull, redirectFragment } from "@/lib/api/fragments/page";
import { staffProfileFragmentFull } from "@/lib/api/fragments/staff-profile";
import { glossaryTermFragmentFull } from "@/lib/api/fragments/glossary-term";
import { studentPageFragmentFull } from "@/lib/api/fragments/student-page";
import { educatorPageFragmentFull } from "@/lib/api/fragments/educator-page";
import { investigationLandingPageFragmentFull } from "@/lib/api/fragments/investigation-landing-page";
import { addRelatedInvestigation } from "@/services/craft/investigations";
import { addSiblings } from "@/services/craft/siblings";
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
    default:
      return gql`
        ${linkFragment}
        ${allPageBlocksFragment}
        ${allNewsBlocksFragment}
        ${eventFragmentFull}
        ${newsPostFragmentFull}
        ${pageFragmentFull}
        ${studentPageFragmentFull}
        ${staffProfileFragmentFull}
        ${glossaryTermFragmentFull}
        ${educatorPageFragmentFull}
        ${investigationLandingPageFragmentFull}
        ${redirectFragment}
        ${entryQueryify(`
          ...eventFragmentFull
          ...newsPostFragmentFull
          ...pageFragmentFull
          ...studentPageFragmentFull
          ...educatorPageFragmentFull
          ...staffProfileFragmentFull
          ...glossaryTermFragmentFull
          ...investigationLandingPageFragmentFull
          ...redirectFragment
        `)}
      `;
  }
}

async function includeRelatedEntries(entry) {
  return await Promise.all([
    await addRelatedInvestigation(entry),
    await addSiblings(entry),
  ]).then((result) => {
    return result.reduce((prev, curr) => {
      return { ...prev, ...curr };
    }, {});
  });
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
  return { ...data.entry, ...(await includeRelatedEntries(data.entry)) };
}
