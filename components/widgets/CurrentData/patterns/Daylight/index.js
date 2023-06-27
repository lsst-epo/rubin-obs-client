import PropTypes from "prop-types";
import { ChartBase } from "@/components/charts";
import * as Styled from "./styles";
import { getLinearScale } from "@/lib/utils";
import { formatTime } from "@/helpers/formatters";
import XAxis from "@/components/charts/XAxis";
import { capitalize, timezoneOffset } from "@/helpers";
import { timezone } from "@/lib/observatory";
import { useTranslation } from "react-i18next";
import ChartLegend from "@/components/charts/Legend";

const Daylight = ({ dawn, sunrise, sunset, night, variant = "primary" }) => {
  const {
    t,
    i18n: { language = "en-US" },
  } = useTranslation();
  const offset = timezoneOffset(timezone);
  const minutes = 1500;
  const width = variant === "primary" ? 280 : 640;
  const height = 70;
  const xDomain = [0, minutes];
  const xScale = getLinearScale(xDomain, [0, width]);
  const xHeight = 25;
  const xPos = height - xHeight;

  const midnight = new Date();
  midnight.setUTCHours(offset, 0, 0, 0);

  const getMinutes = (date) =>
    (date.getUTCHours() - offset) * 60 + date.getMinutes();

  const dawnMinutes = getMinutes(dawn);
  const sunriseMinutes = getMinutes(sunrise);
  const sunsetMinutes = getMinutes(sunset);
  const nightMinutes = getMinutes(night);
  const now = getMinutes(new Date());

  const nightFill = "#1f2121";
  const twilightFill = "#006DA8";
  const dayFill = "#55B9F0";

  const nightId = "legendNight";
  const twilightId = "legendTwilight";
  const dayId = "legendDay";

  const legends = [
    {
      title: t("summit_dashboard.astro.daylight.night"),
      color: nightFill,
      id: nightId,
    },
    {
      title: t("summit_dashboard.astro.daylight.twilight"),
      color: twilightFill,
      id: twilightId,
    },
    {
      title: t("summit_dashboard.astro.daylight.day"),
      color: dayFill,
      id: dayId,
    },
  ];

  return (
    <Styled.Figure
      $variant={variant}
      caption={
        variant === "primary"
          ? t("summit_dashboard.sections.astro.daylight.title")
          : undefined
      }
      legend={<ChartLegend legends={legends} />}
    >
      <ChartBase {...{ width, height }}>
        <XAxis
          {...{
            xDomain,
            xScale,
            y: xPos,
            ticks: 25,
            labelFormatter: (value) => {
              const hours = value / 60;
              const date = new Date();
              date.setUTCHours(hours + offset, 0, 0, 0);

              const time = date.getUTCHours() - offset;

              if (time / 24 === 0) {
                return (
                  <tspan
                    style={{
                      textAnchor: hours === 0 ? "start" : "end",
                      fontSize: variant === "primary" && "10px",
                    }}
                  >
                    {formatTime(date, language)}
                  </tspan>
                );
              }

              if (time === 12) {
                const noon = date.toLocaleTimeString(language, {
                  dayPeriod: "short",
                  timeZone: timezone,
                });

                return (
                  <tspan
                    style={{
                      fontSize: variant === "primary" && "10px",
                    }}
                  >
                    {capitalize(noon, language)}
                  </tspan>
                );
              }
            },
          }}
        />
        <g role="list">
          <Styled.BoundRect
            y={0}
            x={xScale(0)}
            width={xScale(dawnMinutes)}
            height={xPos}
            role="listitem"
            aria-label={t(
              "summit_dashboard.sections.astro.daylight.observing",
              {
                from: formatTime(midnight, language),
                to: formatTime(dawn, language),
              }
            )}
          />
          <Styled.BoundRect
            style={{ "--fill": twilightFill }}
            y={0}
            x={xScale(dawnMinutes)}
            width={xScale(sunriseMinutes - dawnMinutes)}
            height={xPos}
            role="listitem"
            aria-label={t("summit_dashboard.sections.astro.daylight.twilight", {
              from: formatTime(dawn, language),
              to: formatTime(sunrise, language),
            })}
          />
          <Styled.BoundRect
            style={{ "--fill": dayFill }}
            y={0}
            x={xScale(sunriseMinutes)}
            width={xScale(sunsetMinutes - sunriseMinutes)}
            height={xPos}
            role="listitem"
            aria-label={t("summit_dashboard.sections.astro.daylight.daylight", {
              from: formatTime(sunrise, language),
              to: formatTime(sunset, language),
            })}
          />
          <Styled.BoundRect
            style={{ "--fill": twilightFill }}
            y={0}
            x={xScale(sunsetMinutes)}
            width={xScale(nightMinutes - sunsetMinutes)}
            height={xPos}
            role="listitem"
            aria-label={t("summit_dashboard.sections.astro.daylight.twilight", {
              from: formatTime(sunset, language),
              to: formatTime(night, language),
            })}
          />
          <Styled.BoundRect
            y={0}
            x={xScale(nightMinutes)}
            width={xScale(minutes - nightMinutes)}
            height={xPos}
            role="listitem"
            aria-label={t(
              "summit_dashboard.sections.astro.daylight.observing",
              {
                from: formatTime(night, language),
                to: formatTime(midnight, language),
              }
            )}
          />
        </g>
        <g>
          <Styled.Now
            x1={xScale(now)}
            x2={xScale(now)}
            y1={0}
            y2={xPos}
            aria-label={t("summit_dashboard.sections.astro.daylight.current", {
              time: formatTime(new Date(), language),
              context:
                now > nightMinutes || now < dawnMinutes ? "observable" : null,
            })}
          />
          <Styled.NowTip
            points={`${xScale(now)},${xPos} ${xScale(now) + 5},${height - 19} ${
              xScale(now) - 5
            },${height - 19}`}
          />
        </g>
      </ChartBase>
    </Styled.Figure>
  );
};

Daylight.propTypes = {
  dawn: PropTypes.instanceOf(Date).isRequired,
  sunrise: PropTypes.instanceOf(Date).isRequired,
  sunset: PropTypes.instanceOf(Date).isRequired,
  night: PropTypes.instanceOf(Date).isRequired,
  variant: PropTypes.oneOf(["primary", "secondary"]),
};

Daylight.displayName = "Widgets.Current.Daylight";

export default Daylight;
