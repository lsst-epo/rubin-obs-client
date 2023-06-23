import { useState } from "react";
import { useTranslation } from "react-i18next";
import SunCalc from "suncalc";
import WidgetPreview from "@/components/layout/WidgetPreview";
import SummitStatusModal from "@/components/modal/SummitStatusModal";
import MoonPhase from "@/components/widgets/CurrentData/patterns/MoonPhase";

const Astroweather = () => {
  const { t } = useTranslation();
  const [isModalOpen, setModalOpen] = useState(false);

  const { phase } = SunCalc.getMoonIllumination(new Date());
  return (
    <WidgetPreview
      title="Astroweather"
      openModalCallback={() => {
        setModalOpen(true);
      }}
    >
      <MoonPhase phase={phase} />
      <SummitStatusModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
      ></SummitStatusModal>
    </WidgetPreview>
  );
};

Astroweather.displayName = "Dynamic.Astroweather";

export default Astroweather;
