import { type AnyVariables, gql, type TypedDocumentNode } from "@urql/core";
import { useQuery } from "urql";
import { eventFragment } from "@/lib/api/fragments/event";
import { jobFragment } from "@/lib/api/fragments/job";
import { newsPostFragment } from "@/lib/api/fragments/news-post";
import { pageFragment } from "@/lib/api/fragments/page";
import { slideshowFragment } from "@/lib/api/fragments/slideshow";
import { staffProfileFragment } from "@/lib/api/fragments/staff-profile";
import { glossaryTermFragment } from "@/lib/api/fragments/glossary-term";
import { studentPageFragment } from "@/lib/api/fragments/student-page";
import { educatorPageFragment } from "@/lib/api/fragments/educator-page";
import { investigationLandingPageFragment } from "@/lib/api/fragments/investigation-landing-page";
import { galleryFragment } from "@/lib/api/fragments/galleries";

function dataListQueryify(fragment: string) {
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

export default function useDataList({
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
  let theSection: string | null;
  let theOrderBy: string;
  let theDateFilter: string | null = null;
  let query: TypedDocumentNode<any, AnyVariables>;

  const date = new Date();
  const today = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];

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
        ${newsPostFragment}
        ${pageFragment}
        ${studentPageFragment}
        ${slideshowFragment}
        ${staffProfileFragment}
        ${glossaryTermFragment}
        ${educatorPageFragment}
        ${investigationLandingPageFragment}
        ${galleryFragment}
        ${dataListQueryify(`
            ...eventFragment
            ...jobFragment
            ...newsPostFragment
            ...PagePreview
            ...studentPageFragment
            ...slideshowFragment
            ...staffProfileFragment
            ...glossaryTermFragment
            ...educatorPageFragment
            ...investigationLandingPageFragment
            ...galleryFragment
          `)}
      `;
  }

  const [{ data, error: isError, fetching: isLoading }] = useQuery({
    query,
    pause: limit === 0,
    variables: {
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
  });

  return {
    data,
    isLoading,
    isError,
  };
}
