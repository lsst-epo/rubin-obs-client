import styled from "styled-components";
import {
  respond,
  fluidScale,
  BREAK_HEADER_LAYOUT,
  BREAK_MOBILE,
  BREAK_TABLET,
} from "@/styles/globalStyles";

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
  --switch-width: ${fluidScale("90px", "64px", BREAK_TABLET, BREAK_MOBILE)};
  --switch-height: ${fluidScale("49px", "34px", BREAK_TABLET, BREAK_MOBILE)};
  --toggle-margin: 3.5px;
  --toggle-size: calc(var(--switch-height) - var(--toggle-margin) * 2);
  --Inner-before-color: var(--white);
  --Inner-after-color: var(--turquoise90);

  position: relative;
  width: var(--switch-width);
  height: var(--switch-height);
  display: block;
  background-color: var(--turquoise50);
  border: 0 solid var(--turquoise50);
  border-radius: var(--switch-height);
  overflow: hidden;

  &[aria-checked="true"] {
    --Inner-before-color: var(--turquoise90);
    --Inner-after-color: var(--white);
    --Toggle-translateX: calc(
      var(--switch-width) - var(--toggle-size) - var(--toggle-margin) * 2
    );
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
    line-height: var(--switch-height);
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
  top: var(--toggle-margin);
  left: var(--toggle-margin);
  width: var(--toggle-size);
  height: var(--toggle-size);
  background: var(--turquoise90);
  border: 0 solid var(--turquoise85);
  border-radius: 50%;
  transition: transform 0.3s ease-in-out;
  transform: translateX(var(--Toggle-translateX, 0));
`;
