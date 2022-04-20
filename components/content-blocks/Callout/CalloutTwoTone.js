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
import ResponsiveImage from "@/components/atomic/ResponsiveImage";

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
        {backgroundImage?.[0] && (
          <StyledBackgroundImage image={backgroundImage[0]} />
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
    backgroundImage: PropTypes.arrayOf(imageShape).isRequired,
    captionRichText: PropTypes.node,
    header: PropTypes.string,
    image: PropTypes.arrayOf(imageShape).isRequired,
    links: linksShape,
    text: PropTypes.node,
  }).isRequired,
};
