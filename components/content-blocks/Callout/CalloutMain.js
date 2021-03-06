/* eslint-disable react/prop-types */

import PropTypes from "prop-types";
import classNames from "classnames";
import imageShape from "@/shapes/image";
import { linksShape } from "@/shapes/link";
import Wrapper from "./Wrapper";
import { Header, Text, StyledMixedLink, StyledImage } from "./styles";
import TempList from "@/components/dynamic/TempList";
import { useDamAssetAsImage } from "@/lib/utils";

export default function CalloutMain({ callout }) {
  const {
    dynamicComponent,
    header,
    damAsset,
    links,
    padImage,
    text,
    ...wrapperProps
  } = callout;

  const calloutImage = useDamAssetAsImage(damAsset[0]);

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
            className={classNames({
              "c-buttonish": true,
              "c-buttonish--educator":
                wrapperProps.backgroundColor === "orange20",
            })}
          />
        ))}
      </Header>
      {calloutImage && (
        <StyledImage image={calloutImage} $padImage={padImage} />
      )}
      {dynamicComponent === "alertStream" && (
        <TempList dynamicComponent={dynamicComponent} />
      )}
    </Wrapper>
  );
}

CalloutMain.propTypes = {
  callout: PropTypes.shape({
    header: PropTypes.string,
    text: PropTypes.node,
    damAsset: PropTypes.arrayOf(imageShape).isRequired,
    padImage: PropTypes.bool,
    links: linksShape,
    backgroundColor: PropTypes.string,
    order: PropTypes.string,
    width: PropTypes.string,
    ratio: PropTypes.string,
  }).isRequired,
};
