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
import Image from "next/image";
import Link from "next/link";

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

  console.info(wildlifeGallery[0]);
  const gallery = wildlifeGallery[0];
  const wildlifeSpotlightImageUrls = gallery?.assetAlbum.map(
    (image) => image.url.directUrlOriginal
  );
  const wildlifeSpotlightIds = gallery?.assetAlbum?.map((image) => image.id);

  const galleryStr = "/gallery/collections/wildlife-spotlight-test-gallery/";
  const galleryLink = wildlifeSpotlightIds
    ? galleryStr + wildlifeSpotlightIds[0]
    : "no-id";
  const testUrl = wildlifeSpotlightImageUrls
    ? wildlifeSpotlightImageUrls[0]
    : "no-url";

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
                // <p>boop</p>
                <Link href={galleryLink}>
                  <Image src={testUrl} width={500} height={500} alt="alt" />
                </Link>
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
