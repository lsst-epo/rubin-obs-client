import { useState } from "react";
import SunCalc from "suncalc";
import WidgetPreview from "@/components/layout/WidgetPreview";
import SummitStatusModal from "@/components/modal/SummitStatusModal";
import MoonPhase from "@/components/widgets/CurrentData/patterns/MoonPhase";
import Daylight from "@/components/widgets/CurrentData/patterns/Daylight";
import { altitude, lat, long, timezone } from "@/lib/observatory";
import { timezoneOffset } from "@/helpers";
import CurrentAstroweather from "./Current";

const Astroweather = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const now = new Date();
  const offset = timezoneOffset(timezone);

  const { phase } = SunCalc.getMoonIllumination(now);

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
    <WidgetPreview
      title="Astroweather"
      size="large"
      openModalCallback={() => {
        setModalOpen(true);
      }}
    >
      <MoonPhase phase={phase} />
      <Daylight
        dawn={nightEnd}
        sunrise={sunrise}
        sunset={sunset}
        night={night}
      />
      <SummitStatusModal open={isModalOpen} onClose={() => setModalOpen(false)}>
        <CurrentAstroweather />
      </SummitStatusModal>
    </WidgetPreview>
  );
};

Astroweather.displayName = "Dynamic.Astroweather";

export default Astroweather;