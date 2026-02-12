import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSummitData } from "@/contexts/SummitData";
import WidgetPreview from "@/components/layout/SummitStatus/WidgetPreview";
import SummitStatusModal from "@/components/modal/SummitStatusModal";
import MoonPhase from "@/components/widgets/CurrentData/patterns/MoonPhase";
import Daylight from "@/components/widgets/CurrentData/patterns/Daylight";
import CurrentAstroweather from "./Current";
import ForecastAstroweather from "./Forecast";

const Astroweather = () => {
  const { t } = useTranslation();
  const { astroweatherData, isLoading } = useSummitData();
  const [isModalOpen, setModalOpen] = useState(false);

  if (isLoading.astroweather || !astroweatherData) {
    return null;
  }

  const { lunarPhase: phase, solarTimes: times } = astroweatherData;

  return (
    <WidgetPreview
      title={t("summit_dashboard.sections.astro.title")}
      size="large"
      openModalCallback={() => {
        setModalOpen(true);
      }}
    >
      <MoonPhase phase={phase} />
      <Daylight times={times} />
      <SummitStatusModal open={isModalOpen} onClose={() => setModalOpen(false)}>
        <ForecastAstroweather />
        <CurrentAstroweather />
      </SummitStatusModal>
    </WidgetPreview>
  );
};

Astroweather.displayName = "Dynamic.Astroweather";

export default Astroweather;
