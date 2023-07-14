import PropTypes from "prop-types";
import { WidgetBackground } from "./styles";

WidgetBackground.displayName = "Atomic.WidgetBackground";

WidgetBackground.propTypes = {
  $variant: PropTypes.oneOf(["primary", "secondary"]),
};

export default WidgetBackground;
