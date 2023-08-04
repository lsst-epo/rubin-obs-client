import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { formatTime } from "@/helpers/formatters";
import * as Styled from "./styles";
import { capitalize } from "@/helpers";

const MoonRise = ({ rise, set }) => {
  const {
    t,
    i18n: { language = "en" },
  } = useTranslation();
  const now = new Date();

  const getHourDifference = (laterDate, earlierDate) =>
    Math.floor(Math.abs(laterDate - earlierDate) / 36e5);

  const getRelativeTime = (laterDate, earlierDate) =>
    capitalize(
      new Intl.RelativeTimeFormat(language).format(
        getHourDifference(laterDate, earlierDate),
        "hour"
      ),
      language
    );

  const riseDate = new Date(rise);
  const setDate = new Date(set);

  return (
    <Styled.Background $variant="secondary">
      <Styled.Timecard>
        <Styled.Label>
          {t("summit_dashboard.sections.astro.moonrise.time_moonrise")}
        </Styled.Label>
        <Styled.Time as="time" dateTime={riseDate.toISOString()}>
          {formatTime(riseDate, language, { hourCycle: "h24" })}
        </Styled.Time>
        <Styled.Unit>{getRelativeTime(riseDate, now)}</Styled.Unit>
      </Styled.Timecard>
      <Styled.Divider role="presentation" />
      <Styled.Timecard>
        <Styled.Label>
          {t("summit_dashboard.sections.astro.moonrise.time_moonset")}
        </Styled.Label>
        <Styled.Time as="time" dateTime={setDate.toISOString()}>
          {formatTime(setDate, language, { hourCycle: "h24" })}
        </Styled.Time>
        <Styled.Unit>{getRelativeTime(setDate, now)}</Styled.Unit>
      </Styled.Timecard>
    </Styled.Background>
  );
};

MoonRise.displayName = "Widgets.Current.MoonRise";

MoonRise.propTypes = {
  rise: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
    PropTypes.number,
  ]),
  set: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default MoonRise;
