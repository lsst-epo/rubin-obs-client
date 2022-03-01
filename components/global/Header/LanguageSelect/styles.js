import styled from "styled-components";
import { respond, BREAK_HEADER_LAYOUT } from "@/styles/globalStyles";

const SWITCH_WIDTH = 90;
const SWITCH_HEIGHT = 49;
const TOGGLE_MARGIN = 3.5;
const TOGGLE_SIZE = SWITCH_HEIGHT - TOGGLE_MARGIN * 2;

export const Fieldset = styled.fieldset`
  border: 0;
  padding: 0;
  display: flex;
  align-items: center;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-weight: 700;
`;

export const MobileLabelText = styled.span`
  display: none;
  padding-inline-end: 1.75em;

  ${respond(`display: block;`, BREAK_HEADER_LAYOUT)}
`;

export const Switch = styled.button`
  --Inner-before-color: var(--white);
  --Inner-after-color: var(--turquoise90);

  position: relative;
  width: ${SWITCH_WIDTH}px;
  height: ${SWITCH_HEIGHT}px;
  display: block;
  background-color: var(--turquoise50);
  border: 0 solid var(--turquoise50);
  border-radius: ${SWITCH_HEIGHT}px;
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
    font-size: 0.727em;

    ${respond(`font-size: 1em;`, BREAK_HEADER_LAYOUT)}
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
