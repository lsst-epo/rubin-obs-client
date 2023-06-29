import PropTypes from "prop-types";
import { Trans } from "react-i18next";
import WidgetBackground from "@/components/atomic/WidgetBackground";
import Moon from "@/components/svg/unique/moon";
import phases from "@/components/svg/unique/moon/parts";
import * as Styled from "../../styles";

const MoonPhase = ({ phase = 0 }) => {
  const { label } =
    phases[Math.min(Math.floor(phase * phases.length), phases.length - 1)];

  return (
    <WidgetBackground $variant="secondary">
      <Styled.Label>
        <Trans>summit_dashboard.widgets.current.moon</Trans>
      </Styled.Label>
      <Moon phase={phase} size="5em" />
      <Styled.Unit>
        <Trans {...label} />
      </Styled.Unit>
    </WidgetBackground>
  );
};

MoonPhase.displayName = "Widgets.Current.MoonPhase";

MoonPhase.propTypes = {
  phase: PropTypes.number,
};

export default MoonPhase;
