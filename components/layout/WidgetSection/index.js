import PropTypes from "prop-types";
import * as Styled from "./styles";

const WidgetSection = ({
  children,
  title,
  isCollapsible = true,
  isOpen = true,
  onToggleCallback,
}) => {
  const handleToggle = () => {
    onToggleCallback(!isOpen);
  };

  return (
    <Styled.WidgetSection>
      <Styled.SectionHeader>
        {isCollapsible ? (
          <Styled.SectionIconButton
            onClickCallback={handleToggle}
            buttonProps={{ "aria-expanded": isOpen }}
            visibleText={title}
            icon={isOpen ? "Minus" : "Plus"}
            size={28}
            isBlock
          />
        ) : (
          title
        )}
      </Styled.SectionHeader>
      <Styled.SectionContent hidden={isCollapsible && !isOpen}>
        {children}
      </Styled.SectionContent>
    </Styled.WidgetSection>
  );
};

WidgetSection.displayName = "Layout.WidgetSection";

WidgetSection.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  isCollapsible: PropTypes.bool,
  isOpen: PropTypes.bool,
  onToggleCallback: PropTypes.func.isRequired,
};

export default WidgetSection;
