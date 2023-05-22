import styled from "styled-components";
import { RadioGroup } from "@headlessui/react";

export const StyledLocalizationBar = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  color: var(--white, #fff);
  border: none;
  margin: 0;
  padding: 0;
  width: 100%;
  gap: 1ch;
`;
export const StyledHeading = styled.span`
  display: flex;
  align-items: center;
  gap: 1ch;
`;
export const StyledRadioGroup = styled(RadioGroup)`
  display: flex;
  align-items: center;
  gap: 1ch;
`;
export const StyledRadioGroupLabel = styled(RadioGroup.Label)`
  font-size: 60%;
`;

export const StyledRadioGroupOption = styled(RadioGroup.Option)`
  --radio-option-size: 1em;
  --radio-option-outline: none;
  --radio-option-checked-background: transparent;
  --radio-option-checked-size: calc(var(--radio-option-size) * (2 / 3));
  --radio-option-checked-offset: calc(var(--radio-option-size) * (1 / 6));

  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  padding-inline-start: calc(var(--radio-option-size) + 1ch);
  outline: none;

  &::before,
  &::after {
    border-radius: 50%;
    display: inline-block;
    content: "";
    position: absolute;
  }

  &::before {
    aspect-ratio: 1;
    background-color: var(--white, #fff);
    width: var(--radio-option-size);
    height: var(--radio-option-size);
    outline: var(--radio-option-outline);
    left: 0;
  }
  &::after {
    aspect-ratio: 1;
    background-color: var(--radio-option-checked-background);
    width: var(--radio-option-checked-size);
    height: var(--radio-option-checked-size);
    left: var(--radio-option-checked-offset);
  }

  &[aria-checked="true"] {
    --radio-option-checked-background: var(--turquoise55, #009fa1);

    &:focus-visible,
    &.focus-visible {
      --radio-option-outline: var(--radio-option-checked-offset) solid #0f8fff;
    }
  }

  &:not(:disabled):not([aria-checked="true"]):hover {
    --radio-option-outline: var(--radio-option-checked-offset) solid #0f8fff;
  }
`;
