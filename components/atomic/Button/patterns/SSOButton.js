import PropTypes from "prop-types";
import Button from "../";

export default function SSOButton({ icon, children, ...buttonProps }) {
  return (
    <Button
      icon={icon}
      iconSize={30}
      styleAs="tertiary"
      isBlock
      {...buttonProps}
    >
      {children}
    </Button>
  );
}

SSOButton.prototypes = {
  children: PropTypes.node,
  icon: PropTypes.oneOf(["google", "facebook"]),
};
