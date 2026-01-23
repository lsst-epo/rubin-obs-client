import { createContext, useContext, useMemo } from "react";
import PropTypes from "prop-types";
import { useSummitDataQuery } from "@/lib/api/summitData";
import useAstroweather from "@/lib/api/astroweather";
import { useTranslation } from "react-i18next";

export const SummitDataContext = createContext({});

export const SummitDataProvider = ({ children }) => {
  const { t } = useTranslation();
  const weatherSvgs = new Map();
  weatherSvgs
    .set(0, {
      // Use for showing error if invalid pictocode is received
      // TODO: Fill with Error SVG when delivered by Jose
      daySVG: "",
      nightSVG: "",
      description: "Error retrieving weather",
    })
    .set(1, {
      daySVG: "DayClearCloudless",
      nightSVG: "NightClearCloudless",
      description: t(
        "summit_dashboard.sections.weather_condition.description.clear_cloudless_sky"
      ),
    })
    .set(2, {
      daySVG: "DayClearFewClouds",
      nightSVG: "NightClearFewClouds",
      description: t(
        "summit_dashboard.sections.weather_condition.description.clear_and_few_clouds"
      ),
    })
    .set(3, {
      daySVG: "DayClearFewClouds",
      nightSVG: "NightClearFewClouds",
      description: t(
        "summit_dashboard.sections.weather_condition.description.clear_and_few_clouds"
      ),
    })
    .set(4, {
      daySVG: "DayClearFewClouds",
      nightSVG: "NightClearFewClouds",
      description: t(
        "summit_dashboard.sections.weather_condition.description.clear_and_few_clouds"
      ),
    })
    .set(5, {
      daySVG: "DayClearFewClouds",
      nightSVG: "NightClearFewClouds",
      description: t(
        "summit_dashboard.sections.weather_condition.description.clear_and_few_clouds"
      ),
    })
    .set(6, {
      daySVG: "DayClearFewClouds",
      nightSVG: "NightClearFewClouds",
      description: t(
        "summit_dashboard.sections.weather_condition.description.clear_and_few_clouds"
      ),
    })
    .set(7, {
      daySVG: "DayPartlyCloudy",
      nightSVG: "NightPartlyCloudy",
      description: t(
        "summit_dashboard.sections.weather_condition.description.partly_cloudy"
      ),
    })
    .set(8, {
      daySVG: "DayPartlyCloudy",
      nightSVG: "NightPartlyCloudy",
      description: t(
        "summit_dashboard.sections.weather_condition.description.partly_cloudy"
      ),
    })
    .set(9, {
      daySVG: "DayPartlyCloudy",
      nightSVG: "NightPartlyCloudy",
      description: t(
        "summit_dashboard.sections.weather_condition.description.partly_cloudy"
      ),
    })
    .set(10, {
      daySVG: "DayPartlyCloudyPossibleThunder",
      nightSVG: "NightPartlyCloudyPossibleThunder",
      description: t(
        "summit_dashboard.sections.weather_condition.description.mixed_with_thunderstorms"
      ),
    })
    .set(11, {
      daySVG: "DayPartlyCloudyPossibleThunder",
      nightSVG: "NightPartlyCloudyPossibleThunder",
      description: t(
        "summit_dashboard.sections.weather_condition.description.mixed_with_thunderstorms"
      ),
    })
    .set(12, {
      daySVG: "DayPartlyCloudyPossibleThunder",
      nightSVG: "NightPartlyCloudyPossibleThunder",
      description: t(
        "summit_dashboard.sections.weather_condition.description.mixed_with_thunderstorms"
      ),
    })
    .set(13, {
      daySVG: "DayFog",
      nightSVG: "NightFog",
      description: t(
        "summit_dashboard.sections.weather_condition.description.fog"
      ),
    })
    .set(14, {
      daySVG: "DayFog",
      nightSVG: "NightFog",
      description: t(
        "summit_dashboard.sections.weather_condition.description.fog"
      ),
    })
    .set(15, {
      daySVG: "DayFog",
      nightSVG: "NightFog",
      description: t(
        "summit_dashboard.sections.weather_condition.description.fog"
      ),
    })
    .set(16, {
      daySVG: "DayFog",
      nightSVG: "NightFog",
      description: t(
        "summit_dashboard.sections.weather_condition.description.fog"
      ),
    })
    .set(17, {
      daySVG: "DayFog",
      nightSVG: "NightFog",
      description: t(
        "summit_dashboard.sections.weather_condition.description.fog"
      ),
    })
    .set(18, {
      daySVG: "DayFog",
      nightSVG: "NightFog",
      description: t(
        "summit_dashboard.sections.weather_condition.description.fog"
      ),
    })
    .set(19, {
      daySVG: "DayMostlyCloudy",
      nightSVG: "NightMostlyCloudy",
      description: t(
        "summit_dashboard.sections.weather_condition.description.mostly_cloudy"
      ),
    })
    .set(20, {
      daySVG: "DayMostlyCloudy",
      nightSVG: "NightMostlyCloudy",
      description: t(
        "summit_dashboard.sections.weather_condition.description.mostly_cloudy"
      ),
    })
    .set(21, {
      daySVG: "DayMostlyCloudy",
      nightSVG: "NightMostlyCloudy",
      description: t(
        "summit_dashboard.sections.weather_condition.description.mostly_cloudy"
      ),
    })
    .set(22, {
      daySVG: "DayOvercast",
      nightSVG: "NightOvercast",
      description: t(
        "summit_dashboard.sections.weather_condition.description.overcast"
      ),
    })
    .set(23, {
      daySVG: "DayOvercastRain",
      nightSVG: "DayOvercastRain",
      description: t(
        "summit_dashboard.sections.weather_condition.description.overcast_with_rain"
      ),
    })
    .set(24, {
      daySVG: "DayOvercastSnow",
      nightSVG: "NightOvercastSnow",
      description: t(
        "summit_dashboard.sections.weather_condition.description.overcast_with_snow"
      ),
    })
    .set(25, {
      daySVG: "DayMostlyCloudyRain",
      nightSVG: "NightMostlyCloudyRain",
      description: t(
        "summit_dashboard.sections.weather_condition.description.overcast_with_heavy_rain"
      ),
    })
    .set(26, {
      daySVG: "DayOvercastSnow",
      nightSVG: "NightOvercastSnow",
      description: t(
        "summit_dashboard.sections.weather_condition.description.overcast_with_snow"
      ),
    })
    .set(27, {
      daySVG: "DayCloudyRainThunder",
      nightSVG: "NightCloudyRainThunder",
      description: t(
        "summit_dashboard.sections.weather_condition.description.mostly_cloudy_with_thunderstorms"
      ),
    })
    .set(28, {
      daySVG: "DayShowersThunderstormLikely",
      nightSVG: "NightShowersThunderstormLikely",
      description: t(
        "summit_dashboard.sections.weather_condition.description.showers_and_thunderstorms"
      ),
    })
    .set(29, {
      daySVG: "DayOvercastSnow",
      nightSVG: "NightOvercastSnow",
      description: t(
        "summit_dashboard.sections.weather_condition.description.overcast_with_snow"
      ),
    })
    .set(30, {
      daySVG: "DayCloudyHeavyRainThunder",
      nightSVG: "NightCloudyHeavyRainThunder",
      description: t(
        "summit_dashboard.sections.weather_condition.description.cloudy_heavy_rain_and_thunderstorms"
      ),
    })
    .set(31, {
      daySVG: "DayMixedShowers",
      nightSVG: "NightMixedShowers",
      description: t(
        "summit_dashboard.sections.weather_condition.description.mixed_with_showers"
      ),
    })
    .set(32, {
      daySVG: "DayMostlyCloudySnow",
      nightSVG: "NightMostlyCloudySnow",
      description: t(
        "summit_dashboard.sections.weather_condition.description.mostly_cloudy_with_snow"
      ),
    })
    .set(33, {
      daySVG: "DayOvercastLightRain",
      nightSVG: "NightOvercastLightRain",
      description: t(
        "summit_dashboard.sections.weather_condition.description.overcast_with_light_rain"
      ),
    })
    .set(34, {
      daySVG: "DayOvercastLightSnow",
      nightSVG: "NightOvercastLightSnow",
      description: t(
        "summit_dashboard.sections.weather_condition.description.overcast_with_light_snow"
      ),
    })
    .set(35, {
      daySVG: "DayMostlyCloudyMixedRainSnow",
      nightSVG: "NightMostlyCloudyMixedRainSnow",
      description: t(
        "summit_dashboard.sections.weather_condition.description.overcast_with_snow_and_rain"
      ),
    });

  const {
    data: astroweatherData = {},
    isLoading: astroweatherIsLoading,
    isError: astroweatherIsError,
  } = useAstroweather();
  const { data, isLoading, isError } = useSummitDataQuery();
  let summitData = {};
  let summitMedia = { items: {} };
  let pictocode;

  if (data) {
    summitMedia = {
      items: {
        allSkyImage: data.allSkyImage,
        allSkyVideo: data.allSkyVideo,
      },
    };

    summitData = {
      current: data.summitCurrentData.current,
      daily: data.summitDailyData.daily,
      hourly: data.summitHourlyData.hourly,
      domeStatus: data.nightlyDigest.nightlyDigest.domeStatus,
      exposureCount: data.nightlyDigest.nightlyDigest.exposureCount,
      surveyProgress: data.nightlyDigest.nightlyDigest.surveyProgress,
      alertCount: data.nightlyDigest.nightlyDigest.alertCount,
    };
    if (summitData.current.dewPoint === null) {
      summitData.current.dewPoint = 1.0; // temporary code just for demoing/unblocking us
    }

    const rawPictocode =
      data.weatherData?.rawCurrentWeather?.data_current?.pictocode_detailed;
    pictocode = rawPictocode <= 35 ? rawPictocode : 0;
  }

  const dateTime = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Santiago",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
      .formatToParts(new Date())
      .map((p) => [p.type, p.value])
  );

  const time = `${dateTime.hour}:${dateTime.minute} hrs`;
  const date = `${dateTime.year}-${dateTime.month}-${dateTime.day}`;

  const localeContextInfo = {
    time,
    date,
    location: "Chile",
  };

  let currentWeatherArtifacts = {};
  if (pictocode !== undefined && pictocode <= 35) {
    const currentWeather = weatherSvgs.get(pictocode);

    // Switch to using nighttime SVG at 7pm
    const svgName =
      dateTime.hour < "19" ? currentWeather.daySVG : currentWeather.nightSVG;
    const weatherDescription = currentWeather.description;

    currentWeatherArtifacts = {
      svgName,
      weatherDescription,
    };
  }

  const value = useMemo(
    () => ({
      summitData,
      summitMedia,
      astroweatherData,
      error: { hasura: isError, astroweather: astroweatherIsError },
      isLoading: {
        hasura: isLoading,
        astroweather: astroweatherIsLoading,
      },
      localeContextInfo: {
        time,
        date,
        location: "Chile",
      },
      currentWeatherArtifacts,
    }),
    [
      summitData,
      summitMedia,
      astroweatherData,
      isLoading,
      isError,
      astroweatherIsLoading,
      astroweatherIsError,
      localeContextInfo,
      currentWeatherArtifacts,
    ]
  );

  return (
    <SummitDataContext.Provider value={value}>
      {children}
    </SummitDataContext.Provider>
  );
};

SummitDataProvider.propTypes = { children: PropTypes.node };

export const useSummitData = () => useContext(SummitDataContext);
