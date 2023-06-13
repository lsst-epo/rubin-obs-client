import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { formatPercent, formatTime } from "@/helpers/formatters";
import * as Styled from "./styles";

const PrecipitationHourly = ({ precipitationData = [] }) => {
  const {
    t,
    i18n: { language = "en" },
  } = useTranslation();

  return (
    <Styled.HourlyDataBackground $variant="secondary">
      <Styled.HourlyDataTitle>
        {t("summit_dashboard.weather.precipitation_title")}
      </Styled.HourlyDataTitle>
      <Styled.HourlyDataList as="ol" role="list">
        {precipitationData.map(({ probability, time }) => (
          <Styled.PreciptationHourlyItem key={time}>
            <Styled.Time dateTime={formatTime(time, language)}>
              {new Date(time).getHours() === new Date().getHours() ? (
                <strong>
                  {t(
                    "summit_dashboard.weather.condition_now"
                  ).toLocaleUpperCase(language)}
                </strong>
              ) : (
                formatTime(time, language)
              )}
            </Styled.Time>
            <Styled.Probability
              dangerouslySetInnerHTML={{
                __html: formatPercent(probability, language),
              }}
            />
          </Styled.PreciptationHourlyItem>
        ))}
      </Styled.HourlyDataList>
    </Styled.HourlyDataBackground>
  );
};

PrecipitationHourly.displayName = "Widgets.PrecipitationHourly";

PrecipitationHourly.propTypes = {
  precipitationData: PropTypes.arrayOf(
    PropTypes.shape({
      probability: PropTypes.number,
      time: PropTypes.number,
    })
  ).isRequired,
};

export default PrecipitationHourly;
