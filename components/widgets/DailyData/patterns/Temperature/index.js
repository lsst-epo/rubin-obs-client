import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import ScrollableHorizontalWrapper from "@/components/atomic/ScrollableHorizontalWrapper";
import { temperatureUnitType } from "@/components/shapes/units";
import { formatDayName, formatTemperature } from "@/helpers/formatters";
import * as Styled from "./styles";

const TemperatureHistoric = ({
  temperatureData,
  unit = "celsius",
  labelledById,
}) => {
  const {
    t,
    i18n: { language = "en" },
  } = useTranslation();

  return (
    <Styled.TemperatureHistoricBackground>
      <ScrollableHorizontalWrapper>
        <Styled.TemperatureTable aria-labelledby={labelledById}>
          <tbody>
            {temperatureData && (
              <tr>
                <td />
                {temperatureData.map(({ weekday }, i) => (
                  <Styled.TemperatureHeader scope="col" key={i}>
                    {formatDayName(weekday, language)}
                  </Styled.TemperatureHeader>
                ))}
              </tr>
            )}
            {temperatureData && (
              <tr>
                <Styled.TemperatureHeader scope="row">
                  {t("summit_dashboard.weather.temp_daily_max")}
                </Styled.TemperatureHeader>
                {temperatureData.map(({ high }, i) => (
                  <Styled.TemperatureCell
                    style={{ "--cell-font-size": "325%" }}
                    key={i}
                  >
                    {formatTemperature(high, language, unit)}
                  </Styled.TemperatureCell>
                ))}
              </tr>
            )}
            {temperatureData && (
              <tr>
                <Styled.TemperatureHeader scope="row">
                  {t("summit_dashboard.weather.temp_daily_min")}
                </Styled.TemperatureHeader>
                {temperatureData.map(({ low }, i) => (
                  <Styled.TemperatureCell
                    style={{ "--cell-font-size": "225%" }}
                    key={i}
                  >
                    {formatTemperature(low, language, unit)}
                  </Styled.TemperatureCell>
                ))}
              </tr>
            )}
          </tbody>
        </Styled.TemperatureTable>
      </ScrollableHorizontalWrapper>
    </Styled.TemperatureHistoricBackground>
  );
};

TemperatureHistoric.displayName = "Widgets.Daily.Temperature";

TemperatureHistoric.propTypes = {
  unit: temperatureUnitType,
  temperatureData: PropTypes.arrayOf(
    PropTypes.shape({
      weekday: PropTypes.number,
      high: PropTypes.number,
      low: PropTypes.number,
    })
  ).isRequired,
  labelledById: PropTypes.string,
};

export default TemperatureHistoric;
