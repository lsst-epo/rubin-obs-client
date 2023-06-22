import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { formatPercent } from "helpers/formatters";
import WidgetBackground from "@/components/atomic/WidgetBackground";
import * as Styled from "../../styles";

const MoonPhase = ({ phase = 0 }) => {
  const { t, i18n } = useTranslation();
  const { language = "en" } = i18n;

  return <WidgetBackground $variant="secondary"></WidgetBackground>;
};

MoonPhase.displayName = "Widgets.Current.MoonPhase";

MoonPhase.propTypes = {
  phase: PropTypes.number,
};

export default MoonPhase;
