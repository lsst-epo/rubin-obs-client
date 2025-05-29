import PropTypes from "prop-types";
import imageShape from "@/shapes/image";

const siteInfoShape = PropTypes.shape({
  siteTitle: PropTypes.string,
  siteDescription: PropTypes.string,
  siteImage: PropTypes.arrayOf(imageShape),
  contactInfo: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.node,
    })
  ),
});

export default siteInfoShape;
