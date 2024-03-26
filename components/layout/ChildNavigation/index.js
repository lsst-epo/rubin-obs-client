import React from "react";
import PropTypes from "prop-types";
import StepNavigation from "../StepNavigation";

function ChildNavigation({ pages, ...props }) {
  if (!pages?.length) return null;

  const mappedPages = pages.map((page) => {
    return {
      url: page.navLink.url,
      title: page.navLink.text,
    };
  });

  return (
    <StepNavigation pages={mappedPages} expandable columns={1} {...props} />
  );
}

ChildNavigation.propTypes = {
  title: PropTypes.string,
  description: PropTypes.node,
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      navLink: PropTypes.shape({
        url: PropTypes.string,
        title: PropTypes.string,
      }),
    })
  ),
};

export default ChildNavigation;
