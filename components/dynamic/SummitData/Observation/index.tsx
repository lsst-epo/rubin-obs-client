import { useState } from "react";
import Loader from "@/components/atomic/Loader";
import WidgetPreview from "@/components/layout/WidgetPreview";
import SummitStatusModal from "@/components/modal/SummitStatusModal";
import { useSummitData } from "@/contexts/SummitData";
import Azimuth from "@/components/widgets/CurrentData/patterns/Azimuth";
import Zenith from "@/components/widgets/CurrentData/patterns/Zenith";
import Instruments from "./Instruments";

import * as Styled from "./styles";
import Related from "./Related";

const Observation = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const {
    summitData: { current },
    isLoading,
  } = useSummitData();

  if (isLoading.hasura || !current) {
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
  const { azimuth, zenith } = current;

  return (
    <WidgetPreview
      title="Observation-related information"
      openModalCallback={() => {
        setModalOpen(true);
      }}
    >
      <Styled.CondensedBackground $variant="secondary">
        <Azimuth azimuth={azimuth} isCondensed />
        <Zenith zenith={zenith} isCondensed />
      </Styled.CondensedBackground>
      <SummitStatusModal open={isModalOpen} onClose={() => setModalOpen(false)}>
        <Related />
        <Instruments {...{ azimuth, zenith }} />
      </SummitStatusModal>
    </WidgetPreview>
  );
};

Observation.displayName = "Dynamic.Observation";

export default Observation;
