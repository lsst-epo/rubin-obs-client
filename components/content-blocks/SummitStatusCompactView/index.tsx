"use client";
import { FC } from "react";
import { FragmentType, useFragment } from "@/gql";
import { SummitStatusCompactViewBlockFragmentDoc } from "@/gql/graphql";
// import { Container } from "@rubin-epo/epo-react-lib";
import { WeatherUnitProvider } from "@/contexts/WeatherUnit";
import UnitLocalization from "@/components/layout/UnitLocalization";
import { SummitDataProvider } from "@/contexts/SummitData";
import CameraFeeds from "@/components/dynamic/SummitData/CameraFeeds";
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

  return (
    <Styled.Container>
      <WeatherUnitProvider>
        <UnitLocalization />
        <SummitDataProvider>
          {allSkyImage && <CameraFeeds />}
        </SummitDataProvider>
      </WeatherUnitProvider>
    </Styled.Container>
  );
};

// SummitStatusCompactView.propTypes = {
//   summitStatusLayout: PropTypes.oneOf(["compact", "full"]),
// };

SummitStatusCompactView.displayName = "ContentBlock.SummitStatusCompactView";

export default SummitStatusCompactView;
