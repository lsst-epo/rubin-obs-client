import { temperatureUnitType } from "@/components/shapes/units";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { formatTemperature } from "@/helpers/formatters";
import WidgetBackground from "@/components/atomic/WidgetBackground";
import * as Styled from "../../styles";

const TemperatureCurrent = ({ temperature, unit = "celsius" }) => {
  const {
    t,
    i18n: { language = "en" },
  } = useTranslation();

  return (
    <WidgetBackground>
      <Styled.Label>
        {t("summit_dashboard.unit_localization.label_temp")}
      </Styled.Label>
      <Styled.Value $variant="large">
        {formatTemperature(temperature, language, unit)}
      </Styled.Value>
      <Styled.Unit>
        {t(`summit_dashboard.unit_localization.${unit}`)}
      </Styled.Unit>
    </WidgetBackground>
  );
};

TemperatureCurrent.displayName = "Widgets.Current.Temperature";

TemperatureCurrent.propTypes = {
  temperature: PropTypes.number.isRequired,
  unit: temperatureUnitType,
};

export default TemperatureCurrent;
