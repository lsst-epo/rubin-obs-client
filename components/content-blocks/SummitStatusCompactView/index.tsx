"use client";
import { FC } from "react";
import { FragmentType, useFragment } from "@/gql";
import { SummitStatusCompactViewBlockFragmentDoc } from "@/gql/graphql";
// import { Container } from "@rubin-epo/epo-react-lib";
import { WeatherUnitProvider } from "@/contexts/WeatherUnit";
import UnitLocalization from "@/components/layout/UnitLocalization";
import { SummitDataProvider } from "@/contexts/SummitData";
import CameraFeeds from "@/components/dynamic/SummitData/CameraFeeds";
import WidgetGrid from "@/components/layout/WidgetGrid";

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

  // const testImage = {
  //   timeCreated: "2025-12-12T20:05:36.457Z",
  //   updated: "2025-12-12T20:05:36.457Z",
  //   mediaLink:
  //     "https://storage.googleapis.com/download/storage/v1/b/epo_rubintv_data/o/all_sky_current%2Fall_sky_current.jpg?generation=1765569936321849&alt=media",
  //   bucket: "epo_rubintv_data",
  //   name: "all_sky_current/all_sky_current.jpg",
  // };

  return (
    <Styled.Container>
      <WeatherUnitProvider>
        <UnitLocalization />
        <SummitDataProvider>
          <WidgetGrid>
            {allSkyImage && <CameraFeeds isCompact={true} />}
          </WidgetGrid>
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
