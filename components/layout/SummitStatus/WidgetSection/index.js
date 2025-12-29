import PropTypes from "prop-types";
import * as Styled from "./styles";
import InfoIcon from "@/components/molecules/InfoIcon";

const WidgetSection = ({
  children,
  title,
  isCollapsible = true,
  isOpen = true,
  onToggleCallback,
}) => {
  const handleToggle = () => {
    onToggleCallback && onToggleCallback(!isOpen);
  };

  return (
    <Styled.WidgetSection>
      <Styled.SectionTitle>
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
      </Styled.SectionTitle>
      <Styled.SectionContent hidden={isCollapsible && !isOpen}>
        {children}
      </Styled.SectionContent>
      <InfoIcon width={10} height={10} />
    </Styled.WidgetSection>
  );
};

WidgetSection.displayName = "Layout.WidgetSection";

WidgetSection.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  isCollapsible: PropTypes.bool,
  isOpen: PropTypes.bool,
  onToggleCallback: PropTypes.func,
};

export default WidgetSection;
