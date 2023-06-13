import PropTypes from "prop-types";
import { windspeedUnitType } from "@/components/shapes/units";
import { useTranslation } from "react-i18next";
import * as Styled from "./styles";
import ScrollableHorizontalWrapper from "@/components/atomic/ScrollableHorizontalWrapper";
import UniqueIconComposer from "@/components/svg/UniqueIconComposer";
import { ScreenreaderText } from "@rubin-epo/epo-react-lib";

const WindspeedHourly = ({ unit, windspeedData = [], labelledById }) => {
  const {
    t,
    i18n: { language = "en" },
  } = useTranslation();

  const timeFormatter = new Intl.DateTimeFormat(language, {
    timeStyle: "short",
    hourCycle: "h23",
  });

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
    <Styled.WindspeedHourlyBackground>
      <Styled.WindspeedHourlyTitle>
        {t("summit_dashboard.weather.windspeed_title", {
          unit: t(`summit_dashboard.unit_localization.${unit}`, {
            context: "full",
          }),
        })}
      </Styled.WindspeedHourlyTitle>
      <ScrollableHorizontalWrapper>
        <Styled.WindspeedHourlyList role="list" aria-labelledBy={labelledById}>
          {windspeedData &&
            windspeedData.map(({ windspeed, direction, time }) => (
              <Styled.WindspeedHourlyItem key={time} role="listitem">
                <Styled.Time dateTime={timeFormatter.format(time)}>
                  {new Date(time).getHours() === new Date().getHours() ? (
                    <strong>
                      {t(
                        "summit_dashboard.weather.condition_now"
                      ).toLocaleUpperCase(language)}
                    </strong>
                  ) : (
                    timeFormatter.format(time)
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
              </Styled.WindspeedHourlyItem>
            ))}
        </Styled.WindspeedHourlyList>
      </ScrollableHorizontalWrapper>
    </Styled.WindspeedHourlyBackground>
  );
};

WindspeedHourly.displayName = "Widgets.WindspeedHourly";

WindspeedHourly.propTypes = {
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

export default WindspeedHourly;
