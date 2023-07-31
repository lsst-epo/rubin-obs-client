import PropTypes from "prop-types";
import RadialMeter from "@/components/atomic/RadialMeter";
import * as Styled from "./styles";
import { useTranslation } from "react-i18next";

const SlewSpeed = ({ speed = 0, className }) => {
  const { t } = useTranslation();
  const slewLabelId = "slewLabel";
  return (
    <Styled.Container className={className}>
      <Styled.Label id={slewLabelId}>
        {t("summit_dashboard.widgets.current.slew_speed")}
      </Styled.Label>
      <RadialMeter
        min={0}
        max={8}
        value={speed}
        text={t("summit_dashboard.unit_localization.degrees_per_second", {
          context: "withUnit",
          unit: speed,
        })}
        labelledById={slewLabelId}
      />
      <Styled.Unit>
        {t("summit_dashboard.unit_localization.degrees_per_second")}
      </Styled.Unit>
    </Styled.Container>
  );
};

SlewSpeed.displayName = "Widgets.Current.SlewSpeed";

SlewSpeed.propTypes = { speed: PropTypes.number, className: PropTypes.string };

export default SlewSpeed;
