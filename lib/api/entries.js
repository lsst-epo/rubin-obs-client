import useSWR from "swr";
import { gql } from "graphql-request";
import { queryAPI } from "@/lib/fetch";
import { eventFragment } from "@/lib/api/fragments/event";
import { jobFragment } from "@/lib/api/fragments/job";
import { galleryItemFragment } from "@/lib/api/fragments/gallery-item";
import { newsPostFragment } from "@/lib/api/fragments/news-post";
import { pageFragment } from "@/lib/api/fragments/page";
import { slideshowFragment } from "@/lib/api/fragments/slideshow";
import { staffProfileFragment } from "@/lib/api/fragments/staff-profile";
import { glossaryTermFragment } from "@/lib/api/fragments/glossary-term";
import { studentPageFragment } from "./fragments/student-page";
import { educatorPageFragment } from "./fragments/educator-page";

export async function getAllEntries() {
  const query = gql`
    {
      entries(
        site: "*"
        section: ["pages", "homepage", "searchResults"]
        type: ["not", "redirectPage"]
      ) {
        uri
      }
    }
  `;
  const data = await queryAPI(query);
  return data.entries
    .filter(({ uri }) => uri != null)
    .map(({ uri, sectionHandle }) => ({
      params: { uriSegments: uri.split("/"), uri, sectionHandle },
    }));
}

export async function getEntrySectionByUri(uri = "__home__", site = "default") {
  const query = gql`
    {
      entry (uri: "${uri}", site: "${site}") {
        sectionHandle
      }
    }
  `;
  const data = await queryAPI(query);
  return data.entry?.sectionHandle;
}

export function useDataList({
  excludeId = null,
  inReverse = false,
  limit = null,
  listTypeId = null,
  offset = null,
  search = null,
  section = "pages",
  site = "default",
  isSitewideSearch = false,
}) {
  let theSection;
  let theOrderBy;
  let theDateFilter = null;
  const date = new Date();
  const today = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];

  switch (section) {
    case "events":
      theSection = `"events"`;
      theOrderBy = `"date asc"`;
      theDateFilter = `">=${today}"`;
      break;
    case "eventsPast":
      theSection = `"events"`;
      theOrderBy = `"date desc"`;
      theDateFilter = `"<${today}"`;
      break;
    case "galleryItems":
      theSection = `"galleryItems"`;
      theOrderBy = `"dateCreated desc"`;
      break;
    case "jobs":
      theSection = `"jobs"`;
      theOrderBy = `"closeDate desc"`;
      break;
    case "news":
      theSection = `"news"`;
      theOrderBy = `"date desc"`;
      break;
    case "pages":
      theSection = `"pages"`;
      theOrderBy = `"dateCreated desc"`;
      break;
    case "staffProfiles":
      theSection = `"staffProfiles"`;
      theOrderBy = `"title"`;
      break;
    case "glossaryTerms":
      theSection = `"glossaryTerms"`;
      theOrderBy = `"title"`;
      break;
    case "slideshows":
      theSection = `"slideshows"`;
      theOrderBy = `"dateCreated desc"`;
      break;
    default:
      theSection = null; // find a way to pass just news and pages
      theOrderBy = `"dateUpdated desc"`;
  }

  const query =
    limit === 0
      ? null
      : gql`
      ${eventFragment}
      ${jobFragment}
      ${galleryItemFragment}
      ${newsPostFragment}
      ${pageFragment}
      ${studentPageFragment}
      ${slideshowFragment}
      ${staffProfileFragment}
      ${glossaryTermFragment}
      ${educatorPageFragment}
      {
        entries (id: ["not", ${excludeId}], section: ${theSection}, 
          site: "${site}", relatedTo: ${listTypeId}, limit: ${limit}, 
          offset: ${offset}, orderBy: ${
          isSitewideSearch ? `"score"` : theOrderBy
        }, inReverse: ${inReverse}, 
          search: ${search}, date: ${theDateFilter}) {
          ...eventFragment
          ...jobFragment
          ...galleryItemFragment
          ...newsPostFragment
          ...pageFragment
          ...studentPageFragment
          ...educatorPageFragment
          ...slideshowFragment
          ...staffProfileFragment
          ...glossaryTermFragment
        }
        total: entryCount(id: ["not", ${excludeId}], section: ${theSection}, 
          site: "${site}", relatedTo: ${listTypeId}, limit: ${limit}, 
          offset: ${offset}, orderBy: ${theOrderBy}, inReverse: ${inReverse},
          search: ${search}, date: ${theDateFilter})
      }
    `;

  const { data, error } = useSWR(query, queryAPI);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
