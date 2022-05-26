import React from "react";
import PropTypes from "prop-types";
import IconComposer from "@/components/svg/IconComposer";
import * as Styled from "./styles";

function Button({
  label,
  icon,
  iconSize,
  bgColor = "#000",
  bgHoverColor = "#000",
}) {
  return (
    <Styled.Wrapper $bgColor={bgColor} $bgHoverColor={bgHoverColor}>
      <IconComposer icon={icon} size={iconSize} />
      <span className="a-hidden">{label}</span>
    </Styled.Wrapper>
  );
}

Button.displayName = "Share.BaseButton";

Button.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  iconSize: PropTypes.number,
  bgColor: PropTypes.string,
  bgHoverColor: PropTypes.string,
};

export default Button;
