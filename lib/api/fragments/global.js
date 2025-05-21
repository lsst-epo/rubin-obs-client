import { getImageFields } from "@/lib/api/fragments/image";

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
