import styled from "styled-components";

const SWITCH_WIDTH = 74;
const SWITCH_HEIGHT = 39;
const TOGGLE_MARGIN = 3.5;
const TOGGLE_SIZE = SWITCH_HEIGHT - TOGGLE_MARGIN * 2;

export const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
`;

export const Switch = styled.button`
  --Inner-before-color: var(--white);
  --Inner-after-color: var(--turquoise90);

  position: relative;
  width: ${SWITCH_WIDTH}px;
  height: ${SWITCH_HEIGHT}px;
  display: block;
  background-color: var(--turquoise85);
  border: 0 solid var(--turquoise85);
  border-radius: 20px;
  overflow: hidden;

  &[aria-checked="true"] {
    --Inner-before-color: var(--turquoise90);
    --Inner-after-color: var(--white);
    --Toggle-translateX: ${SWITCH_WIDTH - TOGGLE_SIZE - TOGGLE_MARGIN * 2}px;
  }
`;

export const Inner = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &:before,
  &:after {
    position: absolute;
    top: 0;
    width: 50%;
    height: 100%;
    padding-left: 5px;
    padding-right: 5px;
    line-height: ${SWITCH_HEIGHT}px;
    transition: color 0.3s ease-in-out;
  }

  &:before {
    content: "En";
    left: 0;
    color: var(--Inner-before-color);
  }

  &:after {
    content: "Es";
    right: 0;
    color: var(--Inner-after-color);
  }
`;

export const Toggle = styled.span`
  position: absolute;
  top: ${TOGGLE_MARGIN}px;
  left: ${TOGGLE_MARGIN}px;
  width: ${TOGGLE_SIZE}px;
  height: ${TOGGLE_SIZE}px;
  background: var(--turquoise90);
  border: 0 solid var(--turquoise85);
  border-radius: 50%;
  transition: transform 0.3s ease-in-out;
  transform: translateX(var(--Toggle-translateX, 0));
`;
