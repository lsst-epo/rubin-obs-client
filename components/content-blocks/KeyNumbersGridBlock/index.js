"use client";
import PropTypes from "prop-types";
import { mixedLinkShape } from "@/shapes/link";
import * as Styled from "./styles";

const resizeHeaderFontSize = (header) => {
  if (header.length > 5) return "3.181rem";
};

const resizePostscriptFontSize = (postscript) => {
  if (postscript.length > 2) return "1.636rem";
};

const resizeSubheadingFontSize = (subheading) => {
  if (subheading?.length > 20) return "1rem";
};
export default function KeyNumbersGridBlock({ header, keyNumbers, mixedLink }) {
  return (
    <>
      {header && <Styled.Header>{header}</Styled.Header>}
      <Styled.KeyNumbers>
        {keyNumbers.length > 0 &&
          [...keyNumbers].map(
            ({ id, header, subheading, footer, postscript }) => {
              // const cleanSubheading = removeOuterParagraph(subheading);
              return (
                <Styled.KeyNumber key={id}>
                  <Styled.Term>{footer}</Styled.Term>
                  <Styled.Definition>
                    <Styled.Number>
                      <Styled.Heading
                        style={{
                          "--size-text-heading-key-numbers":
                            resizeHeaderFontSize(header),
                        }}
                      >
                        {header}
                      </Styled.Heading>
                      {postscript && (
                        <Styled.Postscript
                          style={{
                            "--size-text-postscript-key-numbers":
                              resizePostscriptFontSize(postscript),
                          }}
                        >
                          {postscript}
                        </Styled.Postscript>
                      )}
                    </Styled.Number>
                    <Styled.Subheading
                      style={{
                        "--size-text-subheading-key-numbers":
                          resizeSubheadingFontSize(subheading),
                      }}
                      dangerouslySetInnerHTML={{
                        __html: subheading || "&nbsp;",
                      }}
                    />
                  </Styled.Definition>
                </Styled.KeyNumber>
              );
            }
          )}
      </Styled.KeyNumbers>
      {mixedLink?.url && (
        <Styled.Link
          {...mixedLink}
          className="c-buttonish c-buttonish--block"
        />
      )}
    </>
  );
}

KeyNumbersGridBlock.displayName = "ContentBlock.KeyNumbersGridBlock";

KeyNumbersGridBlock.propTypes = {
  header: PropTypes.string,
  keyNumbers: PropTypes.array,
  mixedLink: mixedLinkShape,
};
