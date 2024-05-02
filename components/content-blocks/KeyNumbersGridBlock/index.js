import PropTypes from "prop-types";
import { Container } from "@rubin-epo/epo-react-lib";
import { mixedLinkShape } from "@/shapes/link";
import * as Styled from "./styles";

export default function KeyNumbersGridBlock({ header, keyNumbers, mixedLink }) {
  return (
    <Container paddingSize="medium">
      {header && <Styled.Header>{header}</Styled.Header>}
      <Styled.KeyNumbersGrid>
        {keyNumbers.length > 0 &&
          [...keyNumbers].map((keyNumber) => {
            const { id, header, subheading, footer, postscript } = keyNumber;

            return (
              <Styled.KeyNumbersGridItem key={id}>
                <Styled.Top>
                  <Styled.KeyNumber>
                    <Styled.Heading>{header}</Styled.Heading>
                    {postscript && (
                      <Styled.Postscript>{postscript}</Styled.Postscript>
                    )}
                  </Styled.KeyNumber>
                  {subheading && (
                    <Styled.Subheading
                      dangerouslySetInnerHTML={{ __html: subheading }}
                    />
                  )}
                </Styled.Top>
                <Styled.Bottom>{footer}</Styled.Bottom>
              </Styled.KeyNumbersGridItem>
            );
          })}
      </Styled.KeyNumbersGrid>
      {mixedLink?.url && (
        <Styled.Link
          {...mixedLink}
          className="c-buttonish c-buttonish--block"
        />
      )}
    </Container>
  );
}

KeyNumbersGridBlock.displayName = "ContentBlock.KeyNumbersGridBlock";

KeyNumbersGridBlock.propTypes = {
  header: PropTypes.string,
  keyNumbers: PropTypes.array,
  mixedLink: mixedLinkShape,
};
