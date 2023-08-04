import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSummitData } from "@/contexts/SummitData";
import WidgetSection from "@/components/layout/WidgetSection";
import Daylight from "@/components/widgets/CurrentData/patterns/Daylight";

const CurrentAstroweather = () => {
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(true);
  const sectionProps = {
    title: t("summit_dashboard.sections.astro.daylight.title"),
    onToggleCallback: (value) => setOpen(value),
    isOpen,
  };
  const {
    astroweatherData,
    loading: { astroweatherData: loading },
  } = useSummitData();

  if (loading) {
    return null;
  }

  const { solarTimes: times } = astroweatherData;

  return (
    <WidgetSection {...sectionProps}>
      <Daylight times={times} variant="secondary" />
    </WidgetSection>
  );
};

CurrentAstroweather.displayName = "Dynamic.Astroweather.Current";

export default CurrentAstroweather;
