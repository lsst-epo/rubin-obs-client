import { temperatureUnitType } from "@/components/shapes/units";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { formatTemperature } from "@/helpers/formatters";
import WidgetBackground from "@/components/atomic/WidgetBackground";
import * as Styled from "./styles";

const TemperatureCurrent = ({ temperature, unit = "celsius" }) => {
  const {
    t,
    i18n: { language = "en" },
  } = useTranslation();

  return (
    <WidgetBackground>
      <Styled.WidgetLabel>
        {t("summit_dashboard.unit_localization.label_temp")}
      </Styled.WidgetLabel>
      <Styled.WidgetValue>
        {formatTemperature(temperature, language, unit)}
      </Styled.WidgetValue>
      <Styled.WidgetUnit>
        {t(`summit_dashboard.unit_localization.${unit}`)}
      </Styled.WidgetUnit>
    </WidgetBackground>
  );
};

TemperatureCurrent.displayName = "Widgets.TemperatureCurrent";

TemperatureCurrent.propTypes = {
  temperature: PropTypes.number.isRequired,
  unit: temperatureUnitType,
};

export default TemperatureCurrent;
