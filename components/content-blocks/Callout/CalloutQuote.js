import PropTypes from "prop-types";
import imageShape from "@/shapes/image";
import { linksShape } from "@/shapes/link";
import MixedLink from "@/components/atomic/MixedLink";
import Container from "@/components/layout/Container";
import * as Styled from "./CalloutQuote/styles";
import StudentsSvg from "./CalloutQuote/StudentsSvg";
import StudentsMobileSvg from "./CalloutQuote/StudentsMobileSvg";
import EducatorsSvg from "./CalloutQuote/EducatorsSvg";
import EducatorsMobileSvg from "./CalloutQuote/EducatorsMobileSvg";
import classNames from "classnames";

export default function CalloutQuote({ callout }) {
  const { header, text, links, quote, attribution, imageQuote, colorScheme } =
    callout;
  const image = imageQuote?.[0];
  const Svg = colorScheme === "educator" ? EducatorsSvg : StudentsSvg;
  const SvgMobile =
    colorScheme === "educator" ? EducatorsMobileSvg : StudentsMobileSvg;

  return (
    <Container bgColor="white" width="regular">
      <Styled.Inner $colorScheme={colorScheme}>
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
                    className={classNames("c-buttonish", {
                      "c-buttonish--educators": colorScheme === "educator",
                    })}
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
        <Styled.QuoteImageWrapper $colorScheme={colorScheme}>
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
