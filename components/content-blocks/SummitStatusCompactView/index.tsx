"use client";
import { FC } from "react";
import { FragmentType, useFragment } from "@/gql";
import { SummitStatusCompactViewBlockFragmentDoc } from "@/gql/graphql";
import { WeatherUnitProvider } from "@/contexts/WeatherUnit";
import { SummitDataProvider } from "@/contexts/SummitData";
import CameraFeeds from "@/components/dynamic/SummitData/CameraFeeds";
import DomeStatus from "@/components/dynamic/SummitData/DomeStatus";
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
    alertCount,
    allSkyImage,
    exposureCount,
    surveyProgress,
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
              {allSkyImage && <CameraFeeds isCompact={true} />}
              {domeStatus && <DomeStatus isCompact={true} />}
            </WidgetGrid>
          </WidgetContainer>
        </SummitDataProvider>
      </WeatherUnitProvider>
    </Styled.Container>
  );
};

SummitStatusCompactView.displayName = "ContentBlock.SummitStatusCompactView";

export default SummitStatusCompactView;
