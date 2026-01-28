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
import WidgetGrid from "@/components/layout/SummitStatus/WidgetGrid";
import WidgetContainer from "@/components/layout/SummitStatus/WidgetContainer";

import * as Styled from "./styles";

interface SummitStatusCompactViewProps
  extends FragmentType<typeof SummitStatusCompactViewBlockFragmentDoc> {
  locale: string;
}
const SummitStatusCompactView: FC<SummitStatusCompactViewProps> = (props) => {
  // TODO: Rename fields (handles?) in Craft to resemble booleans (allSkyImage --> showAllSkyImage)
  const {
    domeStatus,
    domeStatusTooltipText,
    alertCount,
    alertCountTooltipText,
    allSkyImage,
    allSkyImageTooltipText,
    exposureCount,
    exposureCountTooltipText,
    surveyProgress,
    surveyProgressTooltipText,
    weatherCondition,
  } = useFragment(SummitStatusCompactViewBlockFragmentDoc, props);

  const gridCount = [
    domeStatus,
    alertCount,
    exposureCount,
    surveyProgress,
    weatherCondition,
    allSkyImage,
  ].filter(Boolean).length;

  return (
    <Styled.Container>
      <WeatherUnitProvider>
        <SummitDataProvider>
          <WidgetContainer>
            <WidgetGrid gridCount={gridCount}>
              {allSkyImage && (
                <CameraFeeds
                  tooltipText={allSkyImageTooltipText}
                  isCompact={true}
                />
              )}
              {domeStatus && (
                <DomeStatus
                  tooltipText={domeStatusTooltipText}
                  isCompact={true}
                />
              )}
              {exposureCount && (
                <ExposureCount
                  tooltipText={exposureCountTooltipText}
                  isCompact={true}
                />
              )}
              {SurveyProgress && (
                <SurveyProgress tooltipText={surveyProgressTooltipText} />
              )}
              {alertCount && <AlertCount tooltipText={alertCountTooltipText} />}
              {weatherCondition && <WeatherCondition />}
            </WidgetGrid>
          </WidgetContainer>
        </SummitDataProvider>
      </WeatherUnitProvider>
    </Styled.Container>
  );
};

SummitStatusCompactView.displayName = "ContentBlock.SummitStatusCompactView";

export default SummitStatusCompactView;
