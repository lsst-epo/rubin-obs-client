import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { formatTemperature } from "helpers/formatters";
import WidgetBackground from "@/components/atomic/WidgetBackground";
import * as Styled from "../../styles";
import { temperatureUnitType } from "@/components/shapes/units";

const DewpointCurrent = ({ dewpoint = 0, unit = "celsius" }) => {
  const {
    t,
    i18n: { language = "en" },
  } = useTranslation();

  return (
    <WidgetBackground>
      <Styled.Label>Dewpoint</Styled.Label>
      <Styled.Value $variant="large">
        {formatTemperature(dewpoint, language, unit)}
      </Styled.Value>
      <Styled.Unit>
        {t(`summit_dashboard.unit_localization.${unit}`)}
      </Styled.Unit>
    </WidgetBackground>
  );
};

DewpointCurrent.displayName = "Widgets.Current.Dewpoint";

DewpointCurrent.propTypes = {
  dewpoint: PropTypes.number.isRequired,
  unit: temperatureUnitType,
};

export default DewpointCurrent;
