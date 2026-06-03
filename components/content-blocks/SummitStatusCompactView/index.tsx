"use client";
import { FC } from "react";
import { FragmentType, useFragment } from "@/gql";
import { SummitStatusCompactViewBlockFragmentDoc } from "@/gql/graphql";
import { WeatherUnitProvider } from "@/contexts/WeatherUnit";
import { SummitDataProvider } from "@/contexts/SummitData";
import CameraFeeds from "@/components/dynamic/SummitData/CameraFeeds";
import DomeStatus from "@/components/dynamic/SummitData/DomeStatus";
import ExposureCount from "@/components/dynamic/SummitData/ExposureCount";
import SurveyProgress from "@/components/dynamic/SummitData/SurveyProgress";
import AlertCount from "@/components/dynamic/SummitData/AlertCount";
import WeatherCondition from "@/components/dynamic/SummitData/WeatherCondition";
import SunsetSunrise from "@/components/dynamic/SummitData/SunsetSunrise";
import WidgetGrid from "@/components/layout/SummitStatus/WidgetGrid";
import WidgetContainer from "@/components/layout/SummitStatus/WidgetContainer";
import WildlifeGallerySpotlight from "@/components/dynamic/SummitData/WildlifeGallerySpotlight";

import * as Styled from "./styles";

interface SummitStatusCompactViewProps
  extends FragmentType<typeof SummitStatusCompactViewBlockFragmentDoc> {
  locale: string;
}
const SummitStatusCompactView: FC<SummitStatusCompactViewProps> = (props) => {
  const {
    showWeatherCondition,
    weatherConditionTooltipText,
    showAllSkyImage,
    allSkyImageTooltipText,
    showDomeStatus,
    domeStatusTooltipText,
    showExposureCount,
    exposureCountTooltipText,
    showAlertCount,
    alertCountTooltipText,
    showSurveyProgress,
    surveyProgressTooltipText,
    showSunsetSunriseTimes,
    sunsetSunriseTimesTooltipText,
    showWildlifeGallerySpotlight,
    wildlifeGallery,
    wildlifeGallerySpotlightTooltipText,
    summitStatusDashboardCaption,
  } = useFragment(SummitStatusCompactViewBlockFragmentDoc, props);

  const gridCount = [
    showWeatherCondition,
    showAllSkyImage,
    showDomeStatus,
    showExposureCount,
    showAlertCount,
    showSurveyProgress,
    showSunsetSunriseTimes,
    showWildlifeGallerySpotlight,
  ].filter(Boolean).length;

  return (
    <Styled.Container>
      <WeatherUnitProvider>
        <SummitDataProvider>
          <WidgetContainer dashboardCaption={summitStatusDashboardCaption}>
            <WidgetGrid gridCount={gridCount}>
              {showWeatherCondition && (
                <WeatherCondition tooltipText={weatherConditionTooltipText} />
              )}
              {showAllSkyImage && (
                <CameraFeeds tooltipText={allSkyImageTooltipText} />
              )}
              {showDomeStatus && (
                <DomeStatus tooltipText={domeStatusTooltipText} />
              )}
              {showExposureCount && (
                <ExposureCount tooltipText={exposureCountTooltipText} />
              )}
              {showAlertCount && (
                <AlertCount tooltipText={alertCountTooltipText} />
              )}
              {showSurveyProgress && (
                <SurveyProgress tooltipText={surveyProgressTooltipText} />
              )}
              {showSunsetSunriseTimes && (
                <SunsetSunrise tooltipText={sunsetSunriseTimesTooltipText} />
              )}
              {showWildlifeGallerySpotlight && (
                <WildlifeGallerySpotlight
                  gallery={wildlifeGallery[0]}
                  tooltipText={wildlifeGallerySpotlightTooltipText}
                />
              )}
            </WidgetGrid>
          </WidgetContainer>
        </SummitDataProvider>
      </WeatherUnitProvider>
    </Styled.Container>
  );
};

SummitStatusCompactView.displayName = "ContentBlock.SummitStatusCompactView";

export default SummitStatusCompactView;
