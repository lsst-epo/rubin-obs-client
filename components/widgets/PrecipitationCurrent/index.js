import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { formatPercent } from "helpers/formatters";
import WidgetBackground from "@/components/atomic/WidgetBackground";
import * as Styled from "./styles";

const PrecipitationCurrent = ({ precipitation = 0, humidity = 0 }) => {
  const { t, i18n } = useTranslation();
  const { language = "en" } = i18n;

  return (
    <WidgetBackground $variant="secondary">
      <Styled.WidgetValue
        dangerouslySetInnerHTML={{
          __html: formatPercent(precipitation, language),
        }}
      />
      <Styled.WidgetUnit>
        {t("summit_dashboard.unit_localization.label_precipitation")}
      </Styled.WidgetUnit>
      <Styled.WidgetSeparator />
      <Styled.WidgetValue
        dangerouslySetInnerHTML={{ __html: formatPercent(humidity, language) }}
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
