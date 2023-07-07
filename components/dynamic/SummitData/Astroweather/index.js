import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getMoonIllumination, getTimes } from "@/lib/suncalc";
import WidgetPreview from "@/components/layout/WidgetPreview";
import SummitStatusModal from "@/components/modal/SummitStatusModal";
import MoonPhase from "@/components/widgets/CurrentData/patterns/MoonPhase";
import Daylight from "@/components/widgets/CurrentData/patterns/Daylight";
import { altitude, lat, long, timezone } from "@/lib/observatory";
import { timezoneOffset, timezoneOffsetLocal } from "@/helpers";
import CurrentAstroweather from "./Current";
import ForecastAstroweather from "./Forecast";

const Astroweather = () => {
  const { t } = useTranslation();
  const [isModalOpen, setModalOpen] = useState(false);

  const offset = timezoneOffset(timezone);
  const localOffset = timezoneOffsetLocal(timezone);

  const today = new Date();
  const tomorrow = new Date(today);
  const yesterday = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  yesterday.setDate(yesterday.getDate() - 1);

  const isAfterNoon = today.getUTCHours() - offset > 12;
  const dates = isAfterNoon ? [today, tomorrow] : [yesterday, today];

  const { phase } = getMoonIllumination(today);
  const { sunset, night } = getTimes(dates[0], lat, long, altitude);
  const { nightEnd: dawn, sunrise } = getTimes(dates[1], lat, long, altitude);

  const times = { dawn, sunrise, sunset, night };
  Object.keys(times).forEach((key) => {
    times[key].setHours(times[key].getHours() - localOffset);
  });

  return (
    <WidgetPreview
      title={t("summit_dashboard.sections.astro.title")}
      size="large"
      openModalCallback={() => {
        setModalOpen(true);
      }}
    >
      <MoonPhase phase={phase} />
      <Daylight {...{ ...times, dates }} />
      <SummitStatusModal open={isModalOpen} onClose={() => setModalOpen(false)}>
        <ForecastAstroweather />
        <CurrentAstroweather data={{ daylight: { ...times, dates } }} />
      </SummitStatusModal>
    </WidgetPreview>
  );
};

Astroweather.displayName = "Dynamic.Astroweather";

export default Astroweather;
