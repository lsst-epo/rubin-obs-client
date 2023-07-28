import { useState } from "react";
import WidgetPreview from "@/components/layout/WidgetPreview";
import SummitStatusModal from "@/components/modal/SummitStatusModal";

import Azimuth from "@/components/widgets/CurrentData/patterns/Azimuth";
import Zenith from "@/components/widgets/CurrentData/patterns/Zenith";
import Instruments from "./Instruments";

import * as Styled from "./styles";

const Observation = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const azimuth = 0;
  const zenith = 0;

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
        <Instruments {...{ azimuth, zenith }} />
      </SummitStatusModal>
    </WidgetPreview>
  );
};

Observation.displayName = "Dynamic.Observation";

export default Observation;
