import PropTypes from "prop-types";
import imageShape from "@/shapes/image";

const pageShape = PropTypes.shape({
  id: PropTypes.string,
  uri: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  contentBlocks: PropTypes.arrayOf(PropTypes.object),
  pageType: PropTypes.string.isRequired,
  dynamicComponent: PropTypes.string,
  hero: PropTypes.arrayOf(imageShape),
}).isRequired;

export default pageShape;
