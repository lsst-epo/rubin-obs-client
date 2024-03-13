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
import { investigationLandingPageFragment } from "./fragments/investigation-landing-page";

function dataListQueryify(fragment) {
  return gql`
    query getEntries(
      $excludeId: QueryArgument
      $section: [String]
      $site: [String]
      $relatedTo: [QueryArgument]
      $limit: Int
      $offset: Int
      $orderBy: String
      $inReverse: Boolean
      $search: String
      $date: [QueryArgument]
    ) {
      entries (
        id: ["not", $excludeId], 
        section: $section, 
        site: $site, 
        relatedTo: $relatedTo, 
        limit: $limit, 
        offset: $offset, 
        orderBy: $orderBy, 
        inReverse: $inReverse, 
        search: $search, 
        date: $date) {
        ${fragment}
      }
      total: entryCount(
        id: ["not", $excludeId]
        section: $section
        site: $site
        relatedTo: $relatedTo
        limit: $limit
        offset: $offset
        orderBy: $orderBy
        inReverse: $inReverse
        search: $search
        date: $date)
    }
  `;
}

async function getData(ENV) {
  let data = {};
  if (ENV === "DEV") {
    const query = gql`
      {
        entries(
          site: "*"
          section: ["pages", "homepage", "searchResults"]
          type: ["not", "redirectPage"]
          level: 1
        ) {
          uri
          level
        }
        homepage: entries(
          site: "*"
          section: ["homepage"]
          type: ["not", "redirectPage"]
        ) {
          uri
        }
        search: entries(
          site: "*"
          section: ["searchResults"]
          type: ["not", "redirectPage"]
        ) {
          uri
        }
      }
    `;
    const res = await queryAPI(query);
    data.entries = [...res.entries, ...res.homepage, ...res.search];
  } else {
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
    data = await queryAPI(query);
  }
  return data;
}

export async function getAllEntries() {
  const ENV = process.env.CLOUD_ENV;
  const data = await getData(ENV);
  return data.entries
    .filter(({ uri }) => uri != null)
    .map(({ uri, sectionHandle }) => ({
      params: { uriSegments: uri.split("/"), uri, sectionHandle },
    }));
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
  let query = null;

  const date = new Date();
  const today = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];

  if (limit !== 0) {
    switch (section) {
      case "events":
        theSection = section;
        theOrderBy = "date asc";
        theDateFilter = `>=${today}`;
        query = gql`
          ${eventFragment}
          ${dataListQueryify(`...eventFragment`)}
        `;
        break;
      case "eventsPast":
        theSection = "events";
        theOrderBy = "date desc";
        theDateFilter = `<${today}`;
        query = gql`
          ${eventFragment}
          ${dataListQueryify(`...eventFragment`)}
        `;
        break;
      case "eventsAll":
        theSection = "events";
        theOrderBy = "date desc";
        query = gql`
          ${eventFragment}
          ${dataListQueryify(`...eventFragment`)}
        `;
        break;
      case "galleryItems":
        theSection = section;
        theOrderBy = "dateCreated desc";
        query = gql`
          ${galleryItemFragment}
          ${dataListQueryify(`...galleryItemFragment`)}
        `;
        break;
      case "jobs":
        theSection = section;
        theOrderBy = "closeDate desc";
        query = gql`
          ${jobFragment}
          ${dataListQueryify(`...jobFragment`)}
        `;
        break;
      case "news":
        theSection = section;
        theOrderBy = "date desc";
        query = gql`
          ${newsPostFragment}
          ${dataListQueryify(`...newsPostFragment`)}
        `;
        break;
      case "pages":
        theSection = section;
        theOrderBy = "dateCreated desc";
        query = gql`
          ${pageFragment}
          ${studentPageFragment}
          ${educatorPageFragment}
          ${investigationLandingPageFragment}
          ${dataListQueryify(`
            ...newsPostFragment
            ...studentPageFragment
            ...educatorPageFragment
            ...investigationLandingPageFragment
          `)}
        `;
        break;
      case "staffProfiles":
        theSection = section;
        theOrderBy = "title";
        query = gql`
          ${staffProfileFragment}
          ${dataListQueryify(`...staffProfileFragment`)}
        `;
        break;
      case "glossaryTerms":
        theSection = section;
        theOrderBy = "title";
        query = gql`
          ${glossaryTermFragment}
          ${dataListQueryify(`...glossaryTermFragment`)}
        `;
        break;
      case "slideshows":
        theSection = section;
        theOrderBy = "dateCreated desc";
        query = gql`
          ${slideshowFragment}
          ${dataListQueryify(`...slideshowFragment`)}
        `;
        break;
      default: // find a way to pass just news and pages
        theSection = null;
        theOrderBy = "dateUpdated desc";
        query = gql`
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
          ${investigationLandingPageFragment}
          ${dataListQueryify(`
            ...eventFragment
            ...jobFragment
            ...galleryItemFragment
            ...newsPostFragment
            ...pageFragment
            ...studentPageFragment
            ...slideshowFragment
            ...staffProfileFragment
            ...glossaryTermFragment
            ...educatorPageFragment
            ...investigationLandingPageFragment
          `)}
        `;
    }
  }

  const { data, error } = useSWR(
    [
      query,
      null,
      null,
      {
        excludeId,
        section: theSection,
        site,
        relatedTo: listTypeId,
        limit,
        offset,
        orderBy: isSitewideSearch ? "score" : theOrderBy,
        inReverse,
        search,
        date: theDateFilter,
      },
    ],
    queryAPI
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
