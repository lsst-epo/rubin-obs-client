import PropTypes from "prop-types";
import { IconComposer } from "@rubin-epo/epo-react-lib";
import UniqueIcons from "./unique";

/** adds the unique icons for rubin-obs-client to the icons
 *  already defined in @rubin-epo/epo-react-lib
 */
const UniqueIconComposer = (props) => (
  <IconComposer customIcons={UniqueIcons} {...props} />
);

UniqueIconComposer.displayName = "SVG.UniqueIconComposer";

UniqueIconComposer.propTypes = {
  icon: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.number,
  stroke: PropTypes.string,
  fill: PropTypes.string,
  svgProps: PropTypes.object,
};

export default UniqueIconComposer;
