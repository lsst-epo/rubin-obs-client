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
`;
export const StyledHeading = styled.div`
  display: flex;
  align-items: center;
  font-size: calc(100% * (5 / 6));
  gap: 1ch;
  padding-inline: 1rem;
  line-height: 1;
`;
export const StyledRadioGroup = styled(RadioGroup)`
  display: flex;
  align-items: center;
  gap: 1ch;
  border-left: 1px solid #6a6e6e;
  padding-inline: 1rem;
`;
export const StyledRadioGroupLabel = styled(RadioGroup.Label)`
  line-height: 1;
  font-size: 50%;
`;

export const StyledRadioGroupOption = styled(RadioGroup.Option)`
  --radio-option-size: 1em;
  --radio-option-outline: none;
  --radio-option-checked-background: transparent;
  --radio-option-checked-size: calc(var(--radio-option-size) * (2 / 3));
  --radio-option-checked-offset: calc(var(--radio-option-size) * (1 / 6));

  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  line-height: 1;
  padding-inline-start: calc(var(--radio-option-size) + 1ch);
  outline: none;

  &::before,
  &::after {
    position: absolute;
    display: inline-block;
    content: "";
    border-radius: 50%;
  }

  &::before {
    left: 0;
    width: var(--radio-option-size);
    height: var(--radio-option-size);
    aspect-ratio: 1;
    background-color: var(--white, #fff);
    outline: var(--radio-option-outline);
  }

  &::after {
    left: var(--radio-option-checked-offset);
    width: var(--radio-option-checked-size);
    height: var(--radio-option-checked-size);
    aspect-ratio: 1;
    background-color: var(--radio-option-checked-background);
  }

  &[aria-checked="true"] {
    --radio-option-checked-background: var(--turquoise55, #009fa1);

    &:focus-visible,
    &.focus-visible {
      --radio-option-outline: var(--radio-option-checked-offset) solid #0f8fff;
    }
  }

  &:not(:disabled, [aria-checked="true"]):hover {
    --radio-option-outline: var(--radio-option-checked-offset) solid #0f8fff;
  }
`;
