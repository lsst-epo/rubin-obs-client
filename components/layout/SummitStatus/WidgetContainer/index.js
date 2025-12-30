import * as Styled from "./styles";
import PropTypes from "prop-types";

const WidgetContainer = ({ children }) => {
  return (
    <Styled.WidgetContainer>
      <Styled.HeaderText>Rubin summit status dashboard</Styled.HeaderText>
      {children}
      <Styled.FooterText>See more summit status widgets!</Styled.FooterText>
    </Styled.WidgetContainer>
  );
};
WidgetContainer.displayName = "Layout.WidgetContainer";

WidgetContainer.propTypes = {
  children: PropTypes.node,
};
export default WidgetContainer;
