import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { temperatureUnitType } from "@/components/shapes/units";
import * as Styled from "./styles";
import { formatTemperature } from "@/helpers";

const TemperatureHistoric = ({
  temperatureData,
  unit = "celsius",
  labelledById,
}) => {
  const {
    t,
    i18n: { language = "en" },
  } = useTranslation();

  const getDayName = (day) => {
    const today = new Date();
    const result = new Date(today);
    const diff = day - today.getDay();

    result.setDate(today.getDate() + diff);

    return result.toLocaleDateString(language, { weekday: "long" });
  };

  return (
    <Styled.TemperatureHistoricBackground>
      <Styled.TableWrapper>
        <Styled.TemperatureTable aria-labelledby={labelledById}>
          {temperatureData && (
            <tr>
              <td />
              {temperatureData.map(({ weekday }, i) => (
                <Styled.TemperatureHeader scope="col" key={i}>
                  {getDayName(weekday)}
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
        </Styled.TemperatureTable>
      </Styled.TableWrapper>
    </Styled.TemperatureHistoricBackground>
  );
};

TemperatureHistoric.displayName = "Widgets.TemperatureHistoric";

TemperatureHistoric.propTypes = {
  unit: temperatureUnitType,
  temperatureData: PropTypes.arrayOf({
    weekday: PropTypes.number,
    high: PropTypes.number,
    low: PropTypes.number,
  }).isRequired,
  labelledById: PropTypes.string,
};

export default TemperatureHistoric;
