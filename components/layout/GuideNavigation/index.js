import PropTypes from "prop-types";
import StepNavigation from "../StepNavigation";

export default function GuideNavigation({ pages, ...props }) {
  if (!pages?.length) return null;

  const mappedPages = pages.map((page) => {
    return {
      url: page.uri,
      title: page.title,
    };
  });

  return (
    <StepNavigation pages={mappedPages} columns={2} expandable {...props} />
  );
}

GuideNavigation.propTypes = {
  title: PropTypes.string,
  description: PropTypes.node,
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      uri: PropTypes.string,
      title: PropTypes.string,
    })
  ),
  currentUri: PropTypes.string,
};
