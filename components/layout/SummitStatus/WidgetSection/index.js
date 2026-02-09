import PropTypes from "prop-types";
import * as Styled from "./styles";

const WidgetSection = ({
  children,
  title,
  caption,
  isCollapsible = true,
  isOpen = true,
  onToggleCallback,
  tooltipText = "",
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
      <Styled.SectionFooter>
        <Styled.SectionCaptionContainer>
          {caption && <Styled.SectionCaption>{caption}</Styled.SectionCaption>}
        </Styled.SectionCaptionContainer>
        <Styled.SectionInfoIconContainer>
          {tooltipText && (
            <Styled.WidgetInfoIcon
              height={"0.6em"}
              width={"0.6em"}
              tooltipText={tooltipText}
            />
          )}
        </Styled.SectionInfoIconContainer>
      </Styled.SectionFooter>
    </Styled.WidgetSection>
  );
};

WidgetSection.displayName = "Layout.WidgetSection";

WidgetSection.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  caption: PropTypes.string,
  isCollapsible: PropTypes.bool,
  isOpen: PropTypes.bool,
  isOffline: PropTypes.bool,
  onToggleCallback: PropTypes.func,
  tooltipText: PropTypes.string,
};

export default WidgetSection;
