import PropTypes from "prop-types";
import { windspeedUnitType } from "@/components/shapes/units";
import { useTranslation } from "react-i18next";
import { formatTime } from "@/helpers/formatters";
import * as Styled from "./styles";
import UniqueIconComposer from "@/components/svg/UniqueIconComposer";
import { ScreenreaderText } from "@rubin-epo/epo-react-lib";

const Windspeed = ({ unit, windspeedData = [], labelledById }) => {
  const {
    t,
    i18n: { language = "en" },
  } = useTranslation();

  const directionFormatter = new Intl.NumberFormat(language, {
    notation: "compact",
    style: "unit",
    unit: "degree",
  });

  const speedFormatters = {
    mi: new Intl.NumberFormat(language, {
      style: "unit",
      unit: "mile-per-hour",
      notation: "compact",
      maximumFractionDigits: 0,
    }).format,
    m: new Intl.NumberFormat(language, {
      style: "unit",
      unit: "meter-per-second",
      notation: "compact",
    }).format,
    NM: (value) =>
      `${new Intl.NumberFormat(language, {
        style: "decimal",
        notation: "compact",
        maximumFractionDigits: 0,
      }).format(value)} ${t(`summit_dashboard.unit_localization.${unit}`, {
        context: "full",
      }).toLocaleLowerCase(language)}`,
  };

  return (
    <Styled.HourlyDataBackground>
      <Styled.HourlyDataTitle>
        {t("summit_dashboard.widgets.hourly.windspeed", {
          unit: t(`summit_dashboard.unit_localization.${unit}`, {
            context: "full",
          }),
        })}
      </Styled.HourlyDataTitle>
      <Styled.HourlyDataList as="ol" role="list" aria-labelledby={labelledById}>
        {windspeedData &&
          windspeedData.map(({ windspeed, direction, time }) => (
            <Styled.HourlyDataItem key={time} role="listitem">
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
              <Styled.Direction style={{ "--angle": `${direction}deg` }}>
                {direction ? (
                  <>
                    <UniqueIconComposer icon="arrow" />
                    <ScreenreaderText>
                      {t("summit_dashboard.weather.windspeed_direction", {
                        direction: directionFormatter.format(direction),
                      })}
                    </ScreenreaderText>
                  </>
                ) : (
                  <Styled.NoData>
                    {t("summit_dashboard.weather.no_data_yet")}
                  </Styled.NoData>
                )}
              </Styled.Direction>
              <Styled.Speed>
                {windspeed ? speedFormatters[unit](windspeed) : "\u00A0"}
              </Styled.Speed>
            </Styled.HourlyDataItem>
          ))}
      </Styled.HourlyDataList>
    </Styled.HourlyDataBackground>
  );
};

Windspeed.displayName = "Widgets.HourlyData.Windspeed";

Windspeed.propTypes = {
  unit: windspeedUnitType,
  windspeedData: PropTypes.arrayOf(
    PropTypes.shape({
      windspeed: PropTypes.number,
      direction: PropTypes.number,
      time: PropTypes.number,
    })
  ),
  labelledById: PropTypes.string,
};

export default Windspeed;
