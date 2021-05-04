/* eslint-disable react/prop-types */

import PropTypes from "prop-types";
import imageShape from "@/shapes/image";
import { linksShape } from "@/shapes/link";
import Wrapper from "./Wrapper";
import { Header, Text, StyledMixedLink, StyledImage } from "./styles";
import TempList from "@/components/dynamic/TempList";

export default function CalloutMain({ callout }) {
  const {
    dynamicComponent,
    header,
    image,
    links,
    padImage,
    text,
    ...wrapperProps
  } = callout;

  return (
    <Wrapper
      {...wrapperProps}
      height={dynamicComponent === "alertStream" ? "slim" : ""}
    >
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
      {image?.[0] && <StyledImage image={image[0]} padImage={padImage} />}
      {dynamicComponent === "alertStream" && (
        <TempList dynamicComponent={dynamicComponent} />
      )}
    </Wrapper>
  );
}

CalloutMain.propTypes = {
  callout: PropTypes.shape({
    header: PropTypes.string.isRequired,
    text: PropTypes.node,
    image: PropTypes.arrayOf(imageShape).isRequired,
    padImage: PropTypes.bool,
    links: linksShape,
    backgroundColor: PropTypes.string,
    order: PropTypes.string,
    width: PropTypes.string,
    ratio: PropTypes.string,
  }).isRequired,
};
