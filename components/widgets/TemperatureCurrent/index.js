import { temperatureUnitType } from "@/components/shapes/units";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import * as Styled from "./styles";

const TemperatureCurrent = ({ temperature, unit = "celsius" }) => {
  const { t, i18n } = useTranslation();
  const { language = "en" } = i18n;

  const formatTemperature = (value) => {
    const formatter = new Intl.NumberFormat(language, {
      style: "unit",
      unit,
      maximumFractionDigits: 0,
    });

    return formatter
      .formatToParts(value)
      .map(({ type, value }) => {
        if (type === "unit") {
          return value.replace(/[a-z]/gi, "");
        }

        return value;
      })
      .join("");
  };

  return (
    <Styled.WidgetWrapper>
      <Styled.WidgetLabel>
        {t("summit_dashboard.unit_localization.label_temp")}
      </Styled.WidgetLabel>
      <Styled.WidgetValue>{formatTemperature(temperature)}</Styled.WidgetValue>
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
