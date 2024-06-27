import PropTypes from "prop-types";
import Tags from "./Tags";
import * as Styled from "./styles";

const Aside = ({ children, tags = [], rootHomeLink }) => {
  return (
    <Styled.Aside>
      {children}
      {tags.length > 0 && rootHomeLink && <Tags {...{ tags, rootHomeLink }} />}
    </Styled.Aside>
  );
};

Aside.displayName = "Page.Aside";

Aside.propTypes = {
  children: PropTypes.node,
  tags: PropTypes.array,
  rootHomeLink: PropTypes.object,
};

export default Aside;
