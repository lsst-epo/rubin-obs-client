import PropTypes from "prop-types";
import RadialMeter from "@/components/atomic/RadialMeter";
import * as Styled from "./styles";
import { useTranslation } from "react-i18next";

const ShutterSpeed = ({ speed = 0, className }) => {
  const { t } = useTranslation();
  const shutterLabelId = "shutterLabel";
  return (
    <Styled.Container className={className}>
      <Styled.Label id={shutterLabelId}>
        {t("summit_dashboard.widgets.current.shutter_speed")}
      </Styled.Label>
      <RadialMeter
        min={0}
        max={4}
        value={speed}
        text={t("summit_dashboard.unit_localization.minutes_per_shot", {
          context: "withUnit",
          unit: speed,
        })}
        labelledById={shutterLabelId}
      />
      <Styled.Unit>
        {t("summit_dashboard.unit_localization.minutes_per_shot")}
      </Styled.Unit>
    </Styled.Container>
  );
};

ShutterSpeed.displayName = "Widgets.Current.ShutterSpeed";

ShutterSpeed.propTypes = {
  speed: PropTypes.number,
  className: PropTypes.string,
};

export default ShutterSpeed;
