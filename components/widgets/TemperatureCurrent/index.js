import { temperatureUnitType } from "@/components/shapes/units";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import * as Styled from "./styles";

const TemperatureCurrent = ({ temperature, unit = "celsius" }) => {
  const { t, i18n } = useTranslation();
  const { language = "en" } = i18n;
  return (
    <Styled.WidgetWrapper>
      <Styled.WidgetLabel>Temperature</Styled.WidgetLabel>
      <Styled.WidgetValue>
        {temperature.toLocaleString(language, { maximumFractionDigits: 0 })}
      </Styled.WidgetValue>
      <Styled.WidgetUnit>
        {t(`summit_dashboard.unit_localization.${unit}`)}
      </Styled.WidgetUnit>
    </Styled.WidgetWrapper>
  );
};

TemperatureCurrent.displayName = "Widgets.TemperatureCurrent";

TemperatureCurrent.propTypes = {
  temperature: PropTypes.number.isRequired,
  unit: temperatureUnitType,
};

export default TemperatureCurrent;
