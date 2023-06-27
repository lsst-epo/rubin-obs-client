import { useState } from "react";
import SunCalc from "suncalc";
import { useTranslation } from "react-i18next";
import { altitude, lat, long, timezone } from "@/lib/observatory";
import { timezoneOffset } from "@/helpers";
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

  const now = new Date();
  const offset = timezoneOffset(timezone);

  const observatoryDate = new Date(
    now.toLocaleString("en-US", { timeZone: timezone })
  );

  observatoryDate.setUTCHours(12 - offset, 0, 0, 0);

  const { nightEnd, sunrise, sunset, night } = SunCalc.getTimes(
    observatoryDate,
    lat,
    long,
    altitude
  );

  return (
    <WidgetSection {...sectionProps}>
      <Daylight
        dawn={nightEnd}
        sunrise={sunrise}
        sunset={sunset}
        night={night}
        variant="secondary"
      />
    </WidgetSection>
  );
};

CurrentAstroweather.displayName = "Dynamic.Astroweather.Current";

export default CurrentAstroweather;
