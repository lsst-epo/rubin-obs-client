/* eslint-disable react/prop-types */

import PropTypes from "prop-types";
import imageShape from "@/shapes/image";
import { linksShape } from "@/shapes/link";
import Wrapper from "./Wrapper";
import {
  Caption,
  Header,
  Text,
  StyledMixedLink,
  StyledBackgroundImage,
  StyledTwoToneImage,
} from "./styles";
import { ResponsiveImage } from "@rubin-epo/epo-react-lib";
import { imageShaper } from "@/lib/utils";

export default function CalloutTwoTone({ callout }) {
  const {
    backgroundColor,
    backgroundImage,
    captionRichText,
    header,
    image,
    links,
    text,
  } = callout;

  const calloutBackgroundImage = imageShaper("EN", backgroundImage[0]);

  return (
    <>
      <Wrapper backgroundColor={backgroundColor} order="image" stack="top">
        <Header>
          <h2>{header}</h2>
          {text && (
            <Text
              className="c-content-rte"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          )}
          {links.map((link, index) => (
            <StyledMixedLink
              {...link.mixedLink}
              key={index}
              className="c-buttonish"
            />
          ))}
        </Header>
        {calloutBackgroundImage && (
          <StyledBackgroundImage image={calloutBackgroundImage} />
        )}
      </Wrapper>
      <Wrapper order="image" ratio="33" overlay={true} stack="bottom">
        <Header $align="end">
          {captionRichText && (
            <Caption
              className="c-content-rte"
              dangerouslySetInnerHTML={{ __html: captionRichText }}
            />
          )}
        </Header>
        {image?.[0] && (
          <StyledTwoToneImage>
            <ResponsiveImage image={image[0]} ratio="1:1"></ResponsiveImage>
          </StyledTwoToneImage>
        )}
      </Wrapper>
    </>
  );
}

CalloutTwoTone.propTypes = {
  callout: PropTypes.shape({
    backgroundColor: PropTypes.string,
    backgroundImage: PropTypes.array,
    captionRichText: PropTypes.node,
    header: PropTypes.string,
    image: PropTypes.arrayOf(imageShape),
    links: linksShape,
    text: PropTypes.node,
  }).isRequired,
};
