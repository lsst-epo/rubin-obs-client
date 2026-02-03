import PropTypes from "prop-types";
import * as Styled from "./styles";
import InfoIcon from "@/components/molecules/InfoIcon";

const WidgetSection = ({
  children,
  title,
  caption,
  isCollapsible = true,
  isOpen = true,
  isOffline = false,
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
        {caption && (
          <Styled.SectionCaption $offline={isOffline}>
            {caption}
          </Styled.SectionCaption>
        )}
        {tooltipText && (
          <InfoIcon width={10} height={10} tooltipText={tooltipText} />
        )}
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
