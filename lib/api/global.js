import useSWR from "swr";
import { gql } from "graphql-request";
import { queryAPI } from "@/lib/fetch";
import { getImageFields } from "@/lib/api/fragments/image";
import { linkFragment } from "@/lib/api/fragments/link";

export async function getGlobalData() {
  const query = gql`
  ${linkFragment}
{
  pageTree: entries(section: "pages", site: "default", level: 1, type: ["not", "educatorPages"]) {
    id
    title
    uri
    children(type: ["not", "educatorPages"]) {
      id
      title
      uri
    }
  }
  globals: globalSets(site: "default") {
    ... on rootPageInformation_GlobalSet {
      name
      handle
      customBreadcrumbs {
        ... on customBreadcrumbs_ancestorsAndRoot_BlockType {
          header
          pageEntry {
            id
            title
            uri
          }
        }
      }
    }
    ... on siteInfo_GlobalSet {
      language
      name
      handle
      siteTitle
      siteDescription
      siteImage {
        ... on generalImages_Asset {
          ${getImageFields("crop", 800, 600)}
        }
      }
      email
      facebook
      instagram
      linkedIn
      twitter
      youTube
      contactInfo {
        ... on contactInfo_mail_BlockType {
          id
          typeHandle
          text
        }
        ... on contactInfo_phone_BlockType {
          id
          text
          typeHandle
        }
      }
    }
    ... on footer_GlobalSet {
      id
      name
      handle
      links {
        ...links
      }
      colophon
      supportersLogos {
        ... on generalImages_Asset {
          ${getImageFields("fit", 600)}
        }
      }
      supportersLogosAlt
    }
    ... on contactForm_GlobalSet {
      id
      name
      handle
      contactFormTopics {
        ... on contactFormTopics_topic_BlockType {
          id
          value: topicValue
          label: topicLabel
        }
      }
    }
  }
  allCategories: categories(site: "default") {
    id
    slug
    groupHandle
    title
  }
  userProfilePage: entry(site: "default", type: "userProfilePage") {
    title
    uri
  }
  pageTree_es: entries(section: "pages", site: "es", level: 1, type: ["not", "educatorPages"]) {
    id
    title
    uri
    children(type: ["not", "educatorPages"]) {
      id
      title
      uri
    }
  }
  globals_es: globalSets(site: "es") {
    ... on rootPageInformation_GlobalSet {
      name
      handle
      customBreadcrumbs {
        ... on customBreadcrumbs_ancestorsAndRoot_BlockType {
          header
          pageEntry {
            id
            title
            uri
          }
        }
      }
    }
    ... on siteInfo_GlobalSet {
      language
      name
      handle
      siteTitle
      siteDescription
      siteImage {
        ... on generalImages_Asset {
          ${getImageFields("crop", 800, 600)}
        }
      }
      email
      facebook
      instagram
      linkedIn
      twitter
      youTube
      contactInfo {
        ... on contactInfo_mail_BlockType {
          id
          typeHandle
          text
        }
        ... on contactInfo_phone_BlockType {
          id
          text
          typeHandle
        }
      }
    }
    ... on footer_GlobalSet {
      id
      name
      handle
      links {
        ...links
      }
      colophon
      supportersLogos {
        ... on generalImages_Asset {
          ${getImageFields("fit", 600)}
        }
      }
    }
    ... on contactForm_GlobalSet {
      contactFormTopics {
        ... on contactFormTopics_topic_BlockType {
          id
          value: topicValue
          label: topicLabel
        }
      }
    }
  }
  allCategories_es: categories(site: "es") {
    id
    slug
    groupHandle
    title
  }
  userProfilePage_es: entry(site: "es", type: "userProfilePage") {
    title
    uri
  }
}
  `;
  const data = await queryAPI(query);
  return data;
}

export function useGlobalData() {
  const { data, error } = useSWR(
    gql`
    ${linkFragment}
{
  pageTree: entries(section: "pages", site: "default", level: 1, type: ["not", "educatorPages"]) {
    id
    title
    uri
    children(type: ["not", "educatorPages"]) {
      id
      title
      uri
    }
  }
  globals: globalSets(site: "default") {
    ... on siteInfo_GlobalSet {
      language
      name
      handle
      siteTitle
      siteDescription
      siteImage {
        ... on generalImages_Asset {
          ${getImageFields("crop", 800, 600)}
        }
      }
      email
      facebook
      instagram
      linkedIn
      twitter
      youTube
      contactInfo {
        ... on contactInfo_mail_BlockType {
          id
          typeHandle
          text
        }
        ... on contactInfo_phone_BlockType {
          id
          text
          typeHandle
        }
      }
    }
    ... on footer_GlobalSet {
      id
      name
      handle
      links {
        ...links
      }
      colophon
      supportersLogos {
        ... on generalImages_Asset {
          ${getImageFields("fit", 600)}
        }
      }
    }
  }
  userProfilePage: entry(site: "default", type: "userProfilePage") {
    title
    uri
  }
  pageTree_es: entries(section: "pages", site: "es", level: 1, type: ["not", "educatorPages"]) {
    id
    title
    uri
    children(type: ["not", "educatorPages"]) {
      id
      title
      uri
    }
  }
  globals_es: globalSets(site: "es") {
    ... on siteInfo_GlobalSet {
      language
      name
      handle
      siteTitle
      siteDescription
      siteImage {
        ... on generalImages_Asset {
          ${getImageFields("crop", 800, 600)}
        }
      }
      email
      facebook
      instagram
      linkedIn
      twitter
      youTube
      contactInfo {
        ... on contactInfo_mail_BlockType {
          id
          typeHandle
          text
        }
        ... on contactInfo_phone_BlockType {
          id
          text
          typeHandle
        }
      }
    }
    ... on footer_GlobalSet {
      id
      name
      handle
      links {
        ...links
      }
      colophon
      supportersLogos {
        ... on generalImages_Asset {
          ${getImageFields("fit", 600)}
        }
      }
    }
  }
  userProfilePage_es: entry(site: "es", type: "userProfilePage") {
    title
    uri
  }
}
    `,
    queryAPI
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
