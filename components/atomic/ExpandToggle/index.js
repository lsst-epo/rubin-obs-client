/* eslint-disable react/prop-types */
import * as Styled from "./styles";
import ExpandCollapse from "@/components/svg/unique/ExpandCollapse";

export default function ExpandToggle({
  isOpen,
  onToggle,
  controlsId,
  isHidden,
  ...buttonProps
}) {
  return (
    <Styled.Button
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={controlsId}
      aria-hidden={isHidden}
      {...buttonProps}
    >
      <ExpandCollapse isOpen={isOpen} />
    </Styled.Button>
  );
}
