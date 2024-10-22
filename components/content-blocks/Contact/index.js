"use client";
import PropTypes from "prop-types";
import styled from "styled-components";
import ContactInfo from "@/global/ContactInfo";
import internalLinkShape from "@/shapes/link";
import { Buttonish, Container } from "@rubin-epo/epo-react-lib";
export default function ContactContentBlock({ header, pageEntry, linkText }) {
  const showLink = pageEntry && pageEntry.length > 0;
  return (
    <StyledContainer>
      {header && <h2>{header}</h2>}
      <ContactInfo />
      {showLink && (
        <Buttonish
          isBlock={true}
          text={linkText || pageEntry[0].title}
          url={`/${pageEntry[0].uri}`}
        />
      )}
    </StyledContainer>
  );
}

const StyledContainer = styled(Container)`
  > div > * + * {
    margin-top: 46px;
  }
`;

ContactContentBlock.displayName = "ContentBlock.Contact";

ContactContentBlock.propTypes = {
  header: PropTypes.string,
  pageEntry: PropTypes.arrayOf(internalLinkShape),
  linkText: PropTypes.string,
};
