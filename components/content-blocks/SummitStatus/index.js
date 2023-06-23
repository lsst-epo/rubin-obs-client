import PropTypes from "prop-types";
import { Container } from "@rubin-epo/epo-react-lib";
import { WeatherUnitProvider } from "@/contexts/WeatherUnit";
import UnitLocalization from "@/components/layout/UnitLocalization";
import WidgetGrid from "@/components/layout/WidgetGrid";
import { SummitDataProvider } from "@/contexts/SummitData";
import Weather from "@/components/dynamic/SummitData/Weather";
import Astroweather from "@/components/dynamic/SummitData/Astroweather";

const SummitStatus = ({ summitStatusLayout, widgetPreviews = [] }) => {
  return (
    <Container bgColor="neutral95" width="wide" paddingSize="small">
      <WeatherUnitProvider>
        <UnitLocalization />
        <SummitDataProvider>
          <WidgetGrid>
            <Weather />
            <Astroweather />
          </WidgetGrid>
        </SummitDataProvider>
      </WeatherUnitProvider>
    </Container>
  );
};

SummitStatus.propTypes = {
  summitStatusLayout: PropTypes.oneOf(["compact", "full"]),
  widgetPreviews: PropTypes.arrayOf({}),
};

SummitStatus.displayName = "ContentBlock.SummitStatus";

export default SummitStatus;
