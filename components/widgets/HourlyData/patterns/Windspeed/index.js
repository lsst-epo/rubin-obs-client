import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { windspeedUnitType } from "@/components/shapes/units";
import { useTranslation } from "react-i18next";
import { timezone } from "@/lib/observatory";
import { formatAngle, formatTime } from "@/helpers/formatters";
import * as Styled from "./styles";
import UniqueIconComposer from "@/components/svg/UniqueIconComposer";
import { ScreenreaderText } from "@rubin-epo/epo-react-lib";

const Windspeed = ({ unit, windspeedData = [], labelledById }) => {
  const currentTimeRef = useRef();
  const {
    t,
    i18n: { language = "en" },
  } = useTranslation();

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

  useEffect(() => {
    if (currentTimeRef.current) {
      currentTimeRef.current.scrollIntoView();
    }
  }, []);

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
          windspeedData.map(({ windspeed, direction, time }) => {
            const now = new Date();
            const isYesterday =
              time.toLocaleDateString(language, { timeZone: timezone }) !==
              now.toLocaleDateString(language, { timeZone: timezone });

            if (isYesterday) return null;

            const isNow = time.getHours() === now.getHours();

            return (
              <Styled.HourlyDataItem
                key={time}
                role="listitem"
                ref={isNow ? currentTimeRef : undefined}
              >
                <Styled.Time dateTime={formatTime(time, language)}>
                  {isNow ? (
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
                          direction: formatAngle(direction, language),
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
            );
          })}
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
      time: PropTypes.instanceOf(Date),
    })
  ),
  labelledById: PropTypes.string,
};

export default Windspeed;
