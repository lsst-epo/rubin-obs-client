import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useWeatherUnit } from "@/contexts/WeatherUnit";
import { useSummitData } from "@/contexts/SummitData";
import { convertTemperature } from "@/helpers/converters";
import Loader from "@/components/atomic/Loader";
import WidgetSection from "@/components/layout/WidgetSection";
import DewpointCurrent from "@/components/widgets/CurrentData/patterns/Dewpoint";
import MoonPhase from "@/components/widgets/CurrentData/patterns/MoonPhase";

const Related = () => {
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(true);
  const [{ tempUnit }] = useWeatherUnit();
  const {
    summitData: { current },
    astroweatherData,
    isLoading,
  } = useSummitData();

  const sectionProps = {
    title: t("summit_dashboard.sections.observations.related"),
    onToggleCallback: (value) => setOpen(value),
    isOpen,
  };

  if (isLoading.efd || isLoading.astroweather || !astroweatherData || !current)
    return (
      <WidgetSection {...sectionProps}>
        <Loader isVisible={true} />
      </WidgetSection>
    );

  const { lunarPhase } = astroweatherData;
  const { dewPoint } = current?.[0];
  const dewpoint = convertTemperature(dewPoint, tempUnit);

  return (
    <WidgetSection {...sectionProps}>
      <MoonPhase phase={lunarPhase} />
      <DewpointCurrent dewpoint={dewpoint} unit={tempUnit} />
    </WidgetSection>
  );
};

Related.propTypes = {};

Related.displayName = "Dynamic.Observation.Related";

export default Related;
