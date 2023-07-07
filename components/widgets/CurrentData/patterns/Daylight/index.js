import PropTypes from "prop-types";
import { ChartBase } from "@/components/charts";
import * as Styled from "./styles";
import { getLinearScale } from "@/lib/utils";
import { formatTime } from "@/helpers/formatters";
import XAxis from "@/components/charts/XAxis";
import { timezoneOffset } from "@/helpers";
import { timezone } from "@/lib/observatory";
import { useTranslation } from "react-i18next";
import ChartLegend from "@/components/charts/Legend";

const Daylight = ({
  dawn,
  sunrise,
  sunset,
  night,
  dates,
  variant = "primary",
}) => {
  const {
    t,
    i18n: { language = "en-US" },
  } = useTranslation();

  const offset = timezoneOffset(timezone);

  const width = variant === "primary" ? 280 : 640;
  const height = 70;
  const xDomain = dates.map((date) => {
    const hours = 12 + offset;
    date.setUTCHours(hours, 0, 0, 0);
    return date.getTime();
  });
  const xScale = getLinearScale(xDomain, [0, width]);
  const xHeight = 25;
  const xPos = height - xHeight;

  const now = Date.now();

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
            ticks: 24,
            labelFormatter: (value, i) => {
              const date = new Date(value);
              const hours = date.getUTCHours() - offset;

              if (hours === 12) {
                return (
                  <tspan
                    style={{
                      textAnchor: i !== 24 ? "start" : "end",
                      fontSize: variant === "primary" && "10px",
                    }}
                  >
                    {formatTime(date, language)}
                  </tspan>
                );
              }
              if (hours === 0) {
                return (
                  <tspan
                    style={{
                      fontSize: variant === "primary" && "10px",
                    }}
                  >
                    {t("summit_dashboard.sections.astro.daylight.midnight")}
                  </tspan>
                );
              }
            },
          }}
        />
        <g role="list">
          <Styled.BoundRect
            style={{ "--fill": dayFill }}
            y={0}
            x={0}
            width={xScale(sunset.getTime())}
            height={xPos}
            role="listitem"
            aria-label={t("summit_dashboard.sections.astro.daylight.daylight", {
              from: formatTime(dates[0], language),
              to: formatTime(sunset, language),
            })}
          />
          <Styled.BoundRect
            style={{ "--fill": twilightFill }}
            y={0}
            x={xScale(sunset.getTime())}
            width={xScale(night.getTime()) - xScale(sunset.getTime())}
            height={xPos}
            role="listitem"
            aria-label={t("summit_dashboard.sections.astro.daylight.twilight", {
              from: formatTime(sunset, language),
              to: formatTime(night, language),
            })}
          />
          <Styled.BoundRect
            y={0}
            x={xScale(night.getTime())}
            width={xScale(dawn.getTime()) - xScale(night.getTime())}
            height={xPos}
            role="listitem"
            aria-label={t(
              "summit_dashboard.sections.astro.daylight.observing",
              {
                from: formatTime(night, language),
                to: formatTime(dawn, language),
              }
            )}
          />
          <Styled.BoundRect
            style={{ "--fill": twilightFill }}
            y={0}
            x={xScale(dawn.getTime())}
            width={xScale(sunrise.getTime()) - xScale(dawn.getTime())}
            height={xPos}
            role="listitem"
            aria-label={t("summit_dashboard.sections.astro.daylight.twilight", {
              from: formatTime(sunrise, language),
              to: formatTime(dawn, language),
            })}
          />
          <Styled.BoundRect
            style={{ "--fill": dayFill }}
            y={0}
            x={xScale(sunrise.getTime())}
            width={xScale(dates[1].getTime()) - xScale(sunrise.getTime())}
            height={xPos}
            role="listitem"
            aria-label={t("summit_dashboard.sections.astro.daylight.daylight", {
              from: formatTime(sunrise, language),
              to: formatTime(dates[1], language),
            })}
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
                now > night.getTime() && now < dawn.getTime()
                  ? "observable"
                  : null,
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

export const DaylightDataShape = {
  dawn: PropTypes.instanceOf(Date).isRequired,
  sunrise: PropTypes.instanceOf(Date).isRequired,
  sunset: PropTypes.instanceOf(Date).isRequired,
  night: PropTypes.instanceOf(Date).isRequired,
  dates: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
};

Daylight.propTypes = {
  ...DaylightDataShape,
  variant: PropTypes.oneOf(["primary", "secondary"]),
};

Daylight.displayName = "Widgets.Current.Daylight";

export default Daylight;
