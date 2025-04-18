"use client";
import PropTypes from "prop-types";
import { useId } from "react";
import clsx from "clsx";
import {
  ResponsiveImage,
  Image,
  MixedLink,
  IconComposer,
} from "@rubin-epo/epo-react-lib";
import { mixedLinkShape } from "@/shapes/link";
import { useGlobalData } from "@/lib/utils";
import * as Styled from "./styles";

const SlideTile = ({
  className,
  image,
  isFeature = false,
  link,
  pretitle,
  title,
  text,
  titleTag = "h3",
  type = "related",
}) => {
  const uid = useId();
  const { siteInfo } = useGlobalData();
  const finalImage =
    type === "jobs" ? image : image || siteInfo?.siteImage?.[0];

  typeof link === "string" && (link = { url: link });

  const ratioMap = {
    pages: "8:5",
    events: "1:1",
    news: isFeature ? "1:1" : "4:3",
    slideshows: "4:3",
    search: "1:1",
  };
  const ratio = "4:3";
  const isVideo = pretitle === "Video";
  const TitleTag = titleTag;

  return (
    <Styled.SlideItem>
      <Styled.MixedLink
        as={link?.url ? MixedLink : "div"}
        {...link}
        aria-labelledby={link?.url ? uid : null}
        className={clsx(
          `${type}`,
          `${isFeature ? "featured" : ""} `,
          className
        )}
      >
        {finalImage && (
          <div className="image">
            {ratio ? (
              <ResponsiveImage ratio={ratio} image={finalImage} />
            ) : (
              <Image image={finalImage} />
            )}
            {isVideo && (
              <Styled.PlayButton>
                <IconComposer icon="play" />
              </Styled.PlayButton>
            )}
          </div>
        )}
        {pretitle && <div className="pretitle">{pretitle}</div>}
        {title && (
          <TitleTag id={uid} className="title">
            {title}
          </TitleTag>
        )}
        {text && <div className="text">{text}</div>}
      </Styled.MixedLink>
    </Styled.SlideItem>
  );
};

SlideTile.propTypes = {
  className: PropTypes.string,
  image: PropTypes.object,
  isFeature: PropTypes.bool,
  pretitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  title: PropTypes.string,
  titleTag: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string,
  link: PropTypes.oneOfType([PropTypes.string, mixedLinkShape]),
};

export default SlideTile;
