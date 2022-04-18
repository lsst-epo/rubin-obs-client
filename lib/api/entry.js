import { gql } from "graphql-request";
import { queryAPI } from "@/lib/fetch";
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
} from "@/lib/api/fragments/page";
import { staffProfileFragmentFull } from "@/lib/api/fragments/staff-profile";
import { glossaryTermFragmentFull } from "./fragments/glossary-term";
import { studentPageFragmentFull } from "./fragments/student-page";
import { educatorPageFragmentFull } from "./fragments/educator-page";
import { investigationLandingPageFragmentFull } from "./fragments/investigation-landing-page";
import { addRelatedInvestigation } from "./investigation";
import { addSiblings } from "./sibling-nav";

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

export async function getEntryDataByUri(uri, site = "default", previewToken) {
  const query = gql`
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
      {
        entry (site: "${site}", uri: "${uri}") {
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
        }
      }
    `;
  const data = await queryAPI(query, null, previewToken);

  // Get the related investigation
  const entryWithRelatedData = await includeRelatedEntries(data.entry, site);

  return entryWithRelatedData;
}
