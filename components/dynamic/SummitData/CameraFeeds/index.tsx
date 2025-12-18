import { useState } from "react";
import { useSummitData } from "@/contexts/SummitData";
import Loader from "@/components/atomic/Loader";
import WidgetPreview from "@/components/layout/WidgetPreview";
import WidgetSection from "@/components/layout/WidgetSection";
import SummitStatusModal from "@/components/modal/SummitStatusModal";
import AllSky from "./AllSky";
import CurrentImage from "./AllSky/CurrentImage";
import InfoIcon from "@/components/molecules/InfoIcon";
import * as Styled from "./styles";

const CameraFeeds = (isCompact) => {
  const {
    summitMedia: {
      items: { allSkyImage, allSkyVideo },
    },
    astroweatherData,
    isLoading,
  } = useSummitData();
  const [isModalOpen, setModalOpen] = useState(false);

  if (isLoading.hasura === undefined || isLoading.hasura) {
    return (
      <WidgetPreview
        title="Observation-related information"
        openModalCallback={() => {
          setModalOpen(true);
        }}
      >
        <Loader isVisible={true} />
      </WidgetPreview>
    );
  }

  if (isCompact) {
    return (
      // TODO: Add title text to translation JSON
      <WidgetSection isCollapsible={false} title="All-Sky Camera">
        <Styled.CondensedBackground $variant="secondary">
          <CurrentImage image={allSkyImage} />
        </Styled.CondensedBackground>
        <InfoIcon />
      </WidgetSection>
    );
  }

  return (
    <WidgetPreview
      title="All Sky Camera Feeds"
      callout="All-Sky Camera"
      openModalCallback={() => {
        setModalOpen(true);
      }}
    >
      <Styled.CondensedBackground $variant="secondary">
        {isLoading.hasura ? (
          <Loader isVisible={true} />
        ) : (
          <CurrentImage image={allSkyImage} isPreview />
        )}
      </Styled.CondensedBackground>
      <SummitStatusModal
        showLocalization={false}
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
      >
        <WidgetSection isCollapsible={false}>
          <Styled.CondensedBackground $variant="secondary">
            <AllSky image={allSkyImage} video={allSkyVideo} />
          </Styled.CondensedBackground>
        </WidgetSection>
      </SummitStatusModal>
    </WidgetPreview>
  );
};

CameraFeeds.displayName = "Dynamic.CameraFeeds";

export default CameraFeeds;
