import PropTypes from "prop-types";
import imageShape from "@/shapes/image";

const pageShape = PropTypes.shape({
  id: PropTypes.string,
  uri: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  contentBlocks: PropTypes.arrayOf(PropTypes.object),
  pageType: PropTypes.string,
  dynamicComponent: PropTypes.string,
  hero: PropTypes.arrayOf(imageShape),
  overlapHero: PropTypes.bool,
  typeHandle: PropTypes.oneOf([
    "pages",
    "educatorPages",
    "studentPages",
    "investigationLandingPage",
  ]),
  investigtion: PropTypes.object,
  childNavigation: PropTypes.arrayOf(PropTypes.object),
  childNavigationTitle: PropTypes.string,
  childNavigationDescription: PropTypes.node,
  showGuideNav: PropTypes.bool,
  layout: PropTypes.oneOf(["overlap", "full"]),
  gallery: PropTypes.object,
}).isRequired;

export default pageShape;
