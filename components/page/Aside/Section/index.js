import PropTypes from "prop-types";
import * as Styled from "./styles";

const AsideSection = ({ title, children, className }) => {
  return (
    <section {...{ className }}>
      {title && <Styled.Title>{title}</Styled.Title>}
      {children}
    </section>
  );
};

AsideSection.displayName = "Page.Aside.Section";

AsideSection.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  className: PropTypes.string,
};

export default AsideSection;
