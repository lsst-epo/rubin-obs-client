import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import WidgetBackground from "@/components/atomic/WidgetBackground";
import * as Styled from "./styles";

const PrecipitationCurrent = ({ precipitation = 0, humidity = 0 }) => {
  const { t, i18n } = useTranslation();
  const { language = "en" } = i18n;

  const styledFormatter = (value) => {
    const formatter = new Intl.NumberFormat(language, { style: "percent" });

    const parts = formatter.formatToParts(value).map(({ type, value }) => {
      if (type === "percentSign") {
        return `<span style="font-size: 50%;">${value}</span>`;
      }

      return value;
    });

    return parts.join("");
  };

  return (
    <WidgetBackground $variant="secondary">
      <Styled.WidgetValue
        dangerouslySetInnerHTML={{ __html: styledFormatter(precipitation) }}
      />
      <Styled.WidgetUnit>
        {t("summit_dashboard.unit_localization.label_precipitation")}
      </Styled.WidgetUnit>
      <Styled.WidgetSeparator />
      <Styled.WidgetValue
        dangerouslySetInnerHTML={{ __html: styledFormatter(humidity) }}
      />
      <Styled.WidgetUnit>
        {t("summit_dashboard.unit_localization.label_humidity")}
      </Styled.WidgetUnit>
    </WidgetBackground>
  );
};

PrecipitationCurrent.displayName = "Widgets.PrecipitationCurrent";

PrecipitationCurrent.propTypes = {
  precipitation: PropTypes.number,
  humidity: PropTypes.number,
};

export default PrecipitationCurrent;
