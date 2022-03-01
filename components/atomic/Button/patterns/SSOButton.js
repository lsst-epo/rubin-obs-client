import PropTypes from "prop-types";
import Button from "../";

export default function SSOButton({ icon, children }) {
  return (
    <Button icon={icon} iconSize={30} styleAs="tertiary" isBlock>
      {children}
    </Button>
  );
}

SSOButton.prototypes = {
  children: PropTypes.node,
  icon: PropTypes.oneOf(["google", "facebook"]),
};
