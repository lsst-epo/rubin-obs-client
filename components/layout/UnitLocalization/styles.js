import styled from "styled-components";
import { RadioGroup as BaseRadioGroup } from "@headlessui/react";

export const LocalizationBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: var(--PADDING_SMALL, 20px);
  align-items: center;
  width: 100%;
  padding: 0;
  margin: 0;
  color: var(--white, #fff);
  border: none;
`;
export const Heading = styled.div`
  display: flex;
  gap: 1ch;
  align-items: center;
  padding-inline: var(--PADDING_SMALL, 20px);
  font-size: calc(100% * (5 / 6));
  line-height: 1;
`;
export const RadioGroup = styled(BaseRadioGroup)`
  display: flex;
  gap: 1ch;
  align-items: center;
  padding-inline: var(--PADDING_SMALL, 20px);
  border-left: 1px solid #6a6e6e;
`;
export const RadioGroupLabel = styled(BaseRadioGroup.Label)`
  font-size: 50%;
  line-height: 1;
`;

export const RadioGroupOption = styled(BaseRadioGroup.Option)`
  --radio-option-size: 18px;
  --radio-option-outline: none;
  --radio-option-checked-background: transparent;
  --radio-option-checked-size: calc(var(--radio-option-size) * (2 / 3));
  --radio-option-checked-offset: calc(var(--radio-option-size) * (1 / 6));

  position: relative;
  display: flex;
  align-items: center;
  padding-inline-start: calc(var(--radio-option-size) + 1ch);
  line-height: 1;
  cursor: pointer;
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
