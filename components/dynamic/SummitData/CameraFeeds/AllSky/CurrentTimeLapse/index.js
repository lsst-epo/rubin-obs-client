import PropTypes from "prop-types";
import ReactPlayer from "react-player/file";
import { useTranslation } from "react-i18next";
import { timezone } from "@/lib/observatory";
import { formatTime } from "@/helpers/formatters";
import { useIsMounted } from "@/hooks";
import * as Styled from "./styles";

export default function CurrentTimeLapse({ video, caption }) {
  const {
    t,
    i18n: { language = "en" },
  } = useTranslation();
  const isMounted = useIsMounted();
  if (!isMounted) return null;
  const baseUrl = "https://storage.googleapis.com/";
  const { timeCreated, bucket, name } = video;
  const isAfterMidnight =
    formatTime(new Date(timeCreated), language, {
      dateStyle: undefined,
      timeStyle: "short",
      hour12: false,
      timeZone: timezone,
    }).substring(0, 2) < 12;
  const startTimeCreated = isAfterMidnight
    ? new Date(timeCreated).setDate(new Date(timeCreated).getDate() - 1)
    : new Date(timeCreated);
  const startDate = formatTime(startTimeCreated, language, {
    dateStyle: "short",
    timeStyle: undefined,
    timeZone: timezone,
  });
  const startTime = "12:00 PM";
  const endDate = formatTime(new Date(timeCreated), language, {
    dateStyle: "short",
    timeStyle: undefined,
    timeZone: timezone,
  });
  const endTime = formatTime(new Date(timeCreated), language, {
    dateStyle: undefined,
    timeStyle: "short",
    timeZone: timezone,
  });
  const defaultCaption =
    startDate === endDate
      ? `Timelapse of sky over Rubin: ${startDate}, ${startTime} – ${endTime}`
      : `Timelapse of sky over Rubin: ${startDate}, ${startTime} – ${endDate}, ${endTime}`;

  return (
    <Styled.Figure caption={caption || defaultCaption}>
      <Styled.Wrapper>
        <ReactPlayer
          className="react-player"
          url={`${baseUrl}${bucket}/${name}`}
          controls
          muted
          loop
          config={{
            file: {
              attributes: {
                muted: true,
                autoPlay: true,
                loop: true,
              },
              forceVideo: true,
            },
          }}
          width="100%"
          height="100%"
        />
      </Styled.Wrapper>
    </Styled.Figure>
  );
}

CurrentTimeLapse.propTypes = {
  video: PropTypes.object,
  caption: PropTypes.string,
};
