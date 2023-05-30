import PropTypes from "prop-types";
import * as Styled from "./styles";
import { IconComposer, ScreenreaderText } from "@rubin-epo/epo-react-lib";

const IconButton = ({
  accessibleText,
  visibleText,
  isBlock,
  icon,
  size,
  onClickCallback,
  buttonProps,
  iconProps,
  className,
}) => {
  return (
    <Styled.IconButton
      data-cy="icon-button"
      onClick={(e) => onClickCallback && onClickCallback(e)}
      className={className}
      $isBlock={isBlock}
      {...buttonProps}
    >
      {visibleText}
      {accessibleText && <ScreenreaderText>{accessibleText}</ScreenreaderText>}
      <IconComposer {...{ size, icon, ...iconProps }} />
    </Styled.IconButton>
  );
};

IconButton.displayName = "Atomic.IconButton";

IconButton.propTypes = {
  onClickCallback: PropTypes.func,
  accessibleText: PropTypes.string,
  visibleText: PropTypes.string,
  isBlock: PropTypes.bool,
  icon: PropTypes.string,
  size: PropTypes.number,
  buttonProps: PropTypes.object,
  svgProps: PropTypes.object,
  iconProps: PropTypes.object,
  className: PropTypes.string,
};

export default IconButton;
