import PropTypes from "prop-types";
import { useUID } from "react-uid";
import classNames from "classnames";
import ResponsiveImage from "@/atomic/ResponsiveImage";
import Image from "@/atomic/Image";
import MixedLink from "@/atomic/MixedLink";
import { mixedLinkShape } from "@/shapes/link";
import { useGlobalData } from "@/lib/utils";
import * as Styled from "./styles";
import IconComposer from "@/components/svg/IconComposer";

const Tile = ({
  className,
  footer,
  image,
  isFeature = false,
  link,
  pretitle,
  subtitle,
  title,
  text,
  titleTag = "h3",
  type = "related",
  showSharePopup,
}) => {
  const uid = useUID();
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
  const ratio = ratioMap[type];
  const isVideo = pretitle === "Video";
  const TitleTag = titleTag;

  return (
    <Styled.ListItem>
      <Styled.MixedLink
        as={link?.url ? MixedLink : "div"}
        {...link}
        aria-labelledby={link?.url ? uid : null}
        className={classNames(
          `${type}`,
          `${isFeature ? "featured" : ""} `,
          className
        )}
      >
        {finalImage && (
          <div className="image">
            {ratio ? (
              <ResponsiveImage ratio={ratio} image={finalImage} alt="" />
            ) : (
              <Image image={finalImage} alt="" />
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
        {subtitle && <div className="subtitle">{subtitle}</div>}
        {text && <div className="text">{text}</div>}
        {footer && (
          <div className="footer">
            {footer.button && (
              <div className={`c-buttonish c-buttonish--inert`}>
                {footer.button}
              </div>
            )}
            {footer.sticker && <div>{footer.sticker}</div>}
          </div>
        )}
      </Styled.MixedLink>
      {showSharePopup && <Styled.SharePopup title={title} url={link?.url} />}
    </Styled.ListItem>
  );
};

Tile.propTypes = {
  className: PropTypes.string,
  footer: PropTypes.object,
  image: PropTypes.object,
  isFeature: PropTypes.bool,
  pretitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  title: PropTypes.string,
  subtitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.node,
  ]),
  text: PropTypes.string,
  type: PropTypes.string,
  link: PropTypes.oneOfType([PropTypes.string, mixedLinkShape]),
};

export default Tile;
