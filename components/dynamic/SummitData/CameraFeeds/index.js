import { useState } from "react";
import { useSummitData } from "@/contexts/SummitData";
import Loader from "@/components/atomic/Loader";
import WidgetPreview from "@/components/layout/WidgetPreview";
import WidgetSection from "@/components/layout/WidgetSection";
import SummitStatusModal from "@/components/modal/SummitStatusModal";
import AllSky from "./AllSky";
import CurrentImage from "./AllSky/CurrentImage";
import * as Styled from "./styles";

const CameraFeeds = () => {
  const {
    summitMedia: {
      items: { allSkyImage, allSkyVideo },
    },
    astroweatherData,
    isLoading,
  } = useSummitData();
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <WidgetPreview
      title="All Sky Camera Feeds"
      openModalCallback={() => {
        setModalOpen(true);
      }}
    >
      <Styled.CondensedBackground $variant="secondary">
        {isLoading.efd ? (
          <Loader isVisible={true} />
        ) : (
          <CurrentImage image={allSkyImage} caption="The sky over Rubin" />
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
