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
        }
      }
    `;
  const data = await queryAPI(query, null, previewToken);
  return data.entry;
}
