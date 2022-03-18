import PropTypes from "prop-types";
import imageShape from "@/shapes/image";
import { linksShape } from "@/shapes/link";
import MixedLink from "@/components/atomic/MixedLink";
import Container from "@/components/layout/Container";
import * as Styled from "./CalloutQuote/styles";
import StudentsSvg from "./CalloutQuote/StudentsSvg";
import StudentsMobileSvg from "./CalloutQuote/StudentsMobileSvg";
// import EducatorsSvg from "./CalloutQuote/EducatorsSvg";
// import EducatorsMobileSvg from "./CalloutQuote/EducatorsMobileSvg";

export default function CalloutQuote({ callout }) {
  const { header, text, links, quote, attribution, imageQuote } = callout;
  const image = imageQuote?.[0];
  const Svg = StudentsSvg;
  const SvgMobile = StudentsMobileSvg;

  return (
    <Container bgColor="white" width="regular">
      <Styled.Inner>
        <Styled.Text>
          <h2>{header}</h2>
          {text && (
            <>
              <div
                className="c-content-rte"
                dangerouslySetInnerHTML={{ __html: text }}
              />

              <Styled.Buttons>
                {links?.map((link, index) => (
                  <MixedLink
                    {...link.mixedLink}
                    key={index}
                    className="c-buttonish"
                  />
                ))}
              </Styled.Buttons>
            </>
          )}
        </Styled.Text>
        {quote && (
          <Styled.Quote>
            <div>&ldquo;{quote}&rdquo;</div>
            {attribution && (
              <Styled.Attribution>— {attribution}</Styled.Attribution>
            )}
          </Styled.Quote>
        )}
        <Styled.QuoteImageWrapper>
          <Styled.QuoteSvgDesktop as={Svg} image={image} />
          <Styled.QuoteSvgMobile as={SvgMobile} image={image} />
        </Styled.QuoteImageWrapper>
      </Styled.Inner>
    </Container>
  );
}

CalloutQuote.propTypes = {
  callout: {
    header: PropTypes.string,
    text: PropTypes.node,
    links: linksShape,
    quote: PropTypes.string,
    attribution: PropTypes.string,
    imageQuote: PropTypes.arrayOf(imageShape),
  },
};
