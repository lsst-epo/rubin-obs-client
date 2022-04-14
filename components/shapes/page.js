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
  typeHandle: PropTypes.oneOf(["pages", "educatorPages", "studentPages"]),
  investigtion: PropTypes.object,
}).isRequired;

export default pageShape;
