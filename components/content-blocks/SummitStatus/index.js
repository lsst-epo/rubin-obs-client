import PropTypes from "prop-types";
import { useState } from "react";
import { Container } from "@rubin-epo/epo-react-lib";
import { useTranslation } from "react-i18next";
import NestedContext from "@/contexts/Nested";
import UnitLocalization from "@/components/layout/UnitLocalization";
import WidgetGrid from "@/components/layout/WidgetGrid";
import WidgetPreview from "@/components/layout/WidgetPreview";

const SummitStatus = ({ summitStatusLayout, widgetPreviews = [] }) => {
  /** this logic should be changed to useRouter after i18n refactor */
  const {
    i18n: { language = "en" },
  } = useTranslation();
  const [windspeedUnit, setWindspeedUnit] = useState(
    language === "en" ? "kn" : "m/s"
  );
  const [tempUnit, setTempUnit] = useState(
    language === "en" ? "fahrenheit" : "celsius"
  );

  return (
    <Container bgColor="neutral95" width="wide" paddingSize="small">
      <NestedContext.Provider value={{ tempUnit, windspeedUnit }}>
        <UnitLocalization
          {...{ tempUnit, windspeedUnit }}
          onTempChangeCallback={(value) => setTempUnit(value)}
          onWindChangeCallback={(value) => setWindspeedUnit(value)}
        />
        <WidgetGrid>
          {widgetPreviews.map(({}, i) => (
            <WidgetPreview key={i}></WidgetPreview>
          ))}
        </WidgetGrid>
      </NestedContext.Provider>
    </Container>
  );
};

SummitStatus.propTypes = {
  summitStatusLayout: PropTypes.oneOf(["compact", "full"]),
  widgetPreviews: PropTypes.arrayOf({}),
};

SummitStatus.displayName = "ContentBlock.SummitStatus";

export default SummitStatus;