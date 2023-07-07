import PropTypes from "prop-types";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import WidgetSection from "@/components/layout/WidgetSection";
import Daylight, {
  DaylightDataShape,
} from "@/components/widgets/CurrentData/patterns/Daylight";

const CurrentAstroweather = ({ data }) => {
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(true);
  const sectionProps = {
    title: t("summit_dashboard.sections.astro.daylight.title"),
    onToggleCallback: (value) => setOpen(value),
    isOpen,
  };

  const { daylight } = data;

  return (
    <WidgetSection {...sectionProps}>
      <Daylight {...daylight} variant="secondary" />
    </WidgetSection>
  );
};

CurrentAstroweather.displayName = "Dynamic.Astroweather.Current";

CurrentAstroweather.propTypes = {
  data: PropTypes.shape({
    daylight: PropTypes.shape(DaylightDataShape),
  }),
};

export default CurrentAstroweather;
