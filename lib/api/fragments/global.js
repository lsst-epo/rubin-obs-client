import { getImageFields } from "@/lib/api/fragments/image";

export const siteInfoFragment = `
fragment siteInfoFragment on siteInfo_GlobalSet {
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
`;

// the linkFragement needs to be used alongside this fragment wherever it is imported
export const footerFragment = `
fragment footerFragment on footer_GlobalSet {
  id
  name
  handle
  links {
    ...links
  }
  colophon
  supportersLogos {
    ... on generalImages_Asset {
      ${getImageFields("fit", 1000)}
    }
  }
  supportersLogosAlt
}
`;

export const contactFormFragment = `
fragment contactFormFragment on contactForm_GlobalSet {
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
`;
