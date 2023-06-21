import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { windspeedUnitType } from "@/components/shapes/units";
import { defaultWindspeedUnit } from "@/contexts/WeatherUnit";
import WidgetBackground from "@/components/atomic/WidgetBackground";
import * as Styled from "../../styles";

const WindspeedCurrent = ({ windspeed = 0, unit = defaultWindspeedUnit }) => {
  const {
    t,
    i18n: { language = "en" },
  } = useTranslation();

  return (
    <WidgetBackground>
      <Styled.Label>
        {t("summit_dashboard.widgets.current.windspeed")}
      </Styled.Label>
      <Styled.Value $variant="large">
        {new Intl.NumberFormat(language, {
          style: "decimal",
          maximumFractionDigits: unit === defaultWindspeedUnit ? 1 : 0,
        }).format(windspeed)}
      </Styled.Value>
      <Styled.Unit>
        {t(`summit_dashboard.unit_localization.${unit}`, {
          context: "full",
        })}
      </Styled.Unit>
    </WidgetBackground>
  );
};

WindspeedCurrent.propTypes = {
  unit: windspeedUnitType,
  windspeed: PropTypes.number,
};

WindspeedCurrent.displayName = "Widgets.Current.Windspeed";

export default WindspeedCurrent;
