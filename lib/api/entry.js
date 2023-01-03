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
  let query = null;

  switch (section) {
    case "homepage":
      query = gql`
        ${linkFragment}
        ${allPageBlocksFragment}
        ${homepageFragmentFull}
          {
            entry (
              section: "${section}"
              type: "${type}"
              site: "${site}"
              uri: "${uri}"
            ) {
              ...homepageFragmentFull
            }
          }
        `;
      break;
    case "pages":
      query = gql`
        ${linkFragment}
        ${allPageBlocksFragment}
        ${pageFragmentFull}
        ${studentPageFragmentFull}
        ${educatorPageFragmentFull}
        ${investigationLandingPageFragmentFull}
          {
            entry (
              section: "${section}"
              type: "${type}"
              site: "${site}"
              uri: "${uri}"
            ) {
              ...pageFragmentFull
              ...studentPageFragmentFull
              ...educatorPageFragmentFull
              ...investigationLandingPageFragmentFull
              ... on pages_redirectPage_Entry {
                typeHandle
                linkTo {
                  url
                }
              }
            }
          }
        `;
      break;
    case "news":
      query = gql`
          ${allNewsBlocksFragment}
          ${newsPostFragmentFull}
            {
              entry (
                section: "${section}"
                type: "${type}"
                site: "${site}"
                uri: "${uri}"
              ) {
                ...newsPostFragmentFull
              }
            }
          `;
      break;
    case "events":
      query = gql`
        ${linkFragment}
        ${allPageBlocksFragment}
        ${eventFragmentFull}
          {
            entry (
              section: "${section}"
              type: "${type}"
              site: "${site}"
              uri: "${uri}"
            ) {
              ...eventFragmentFull
            }
          }
        `;
      break;
    case "staffProfiles":
      query = gql`
        ${linkFragment}
        ${allPageBlocksFragment}
        ${staffProfileFragmentFull}
          {
            entry (
              section: "${section}"
              type: "${type}"
              site: "${site}"
              uri: "${uri}"
            ) {
              ...staffProfileFragmentFull
            }
          }
        `;
      break;
    case "glossaryTerms":
      query = gql`
        ${glossaryTermFragmentFull}
          {
            entry (
              section: "${section}"
              type: "${type}"
              site: "${site}"
              uri: "${uri}"
            ) {
              ...glossaryTermFragmentFull
            }
          }
        `;
      break;
    case "userProfilePage":
      query = gql`
        ${userProfileFragmentFull}
          {
            entry (
              section: "${section}"
              type: "${type}"
              site: "${site}"
              uri: "${uri}"
            ) {
              ...userProfileFragmentFull
            }
          }
        `;
      break;
    case "searchResults":
      query = gql`
        ${searchFragmentFull}
          {
            entry (
              section: "${section}"
              type: "${type}"
              site: "${site}"
              uri: "${uri}"
            ) {
              ...searchFragmentFull
            }
          }
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
          {
            entry (
              section: "${section}"
              type: "${type}"
              site: "${site}"
              uri: "${uri}"
            ) {
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
              ... on pages_redirectPage_Entry {
                typeHandle
                linkTo {
                  url
                }
              }
            }
          }
        `;
      break;
  }

  const data = await queryAPI(query, null, previewToken);

  // Get the related investigation
  const entryWithRelatedData = await includeRelatedEntries(data.entry, site);

  return entryWithRelatedData;
}
