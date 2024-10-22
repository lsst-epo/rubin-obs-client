"use client";
import PropTypes from "prop-types";
import { Container } from "@rubin-epo/epo-react-lib";
import { mixedLinkShape } from "@/shapes/link";
import { makeDateString } from "@/lib/utils";
import * as Styled from "./styles";

export default function PublicationsListBlock({
  header,
  publications,
  mixedLink,
}) {
  return (
    <Container paddingSize="medium">
      {header && <Styled.Header>{header}</Styled.Header>}
      {publications.length > 0 &&
        [...publications].map((publication) => {
          const { id, title, authorPub, creditPub, date, externalUrl } =
            publication;
          return (
            <Styled.Publication key={id} href={externalUrl}>
              <Styled.Title>{title}</Styled.Title>
              {authorPub && (
                <Styled.Author>
                  <Styled.Bold>Lead Author:</Styled.Bold> {authorPub}
                </Styled.Author>
              )}
              {creditPub && (
                <Styled.Credit>
                  <Styled.Bold>Other Authors / Credit:</Styled.Bold> {creditPub}
                </Styled.Credit>
              )}
              {date && (
                <Styled.PubDate>
                  <Styled.Bold>Publication Date:</Styled.Bold>{" "}
                  {makeDateString(date)}
                </Styled.PubDate>
              )}
            </Styled.Publication>
          );
        })}
      {mixedLink?.url && (
        <Styled.Link
          {...mixedLink}
          className="c-buttonish c-buttonish--block"
        />
      )}
    </Container>
  );
}

PublicationsListBlock.displayName = "ContentBlock.PublicationsListBlock";

PublicationsListBlock.propTypes = {
  header: PropTypes.string,
  publications: PropTypes.array,
  mixedLink: mixedLinkShape,
};
