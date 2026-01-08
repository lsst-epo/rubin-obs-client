import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Image } from "@rubin-epo/epo-react-lib";
import { timezone } from "@/lib/observatory";
import { formatTime } from "@/helpers/formatters";
import * as Styled from "./styles";

export default function CurrentImage({ image, caption, altText, isPreview }) {
  const {
    t,
    i18n: { language = "en" },
  } = useTranslation();
  const { mediaLink, timeCreated, bucket, name } = image;
  const baseUrl = "https://storage.googleapis.com/";
  const timeShort = formatTime(new Date(timeCreated), language, {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: timezone,
  });
  const timeLong = formatTime(new Date(timeCreated), language, {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: timezone,
  });
  const defaultAltText = `The sky over Rubin: ${timeLong}`;
  const defaultCaption = `The sky over Rubin: ${timeShort}`;
  const currentImage = {
    altText: altText || defaultAltText,
    url: `${baseUrl}${bucket}/${name}`,
    url2x: `${baseUrl}${bucket}/${name}`,
    url3x: `${baseUrl}${bucket}/${name}`,
  };

  if (isPreview) {
    return (
      <Styled.PreviewFigure caption={caption || defaultCaption}>
        <Image image={currentImage} />
      </Styled.PreviewFigure>
    );
  }

  return <Image image={currentImage} />;
}

CurrentImage.propTypes = {
  image: PropTypes.object,
  caption: PropTypes.string,
  altText: PropTypes.string,
  isPreview: PropTypes.bool,
};
