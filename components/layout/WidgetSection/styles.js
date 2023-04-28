import IconButton from "@/components/atomic/Button/IconButton";
import styled from "styled-components";

export const WidgetSection = styled.section`
  --section-color: var(--white, #fff);
  background-color: var(--black, #000);
  border-radius: 10px;
  color: var(--section-color);
  padding: var(--PADDING_SMALL, 20px);

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: normal;
  }
`;

export const SectionIconButton = styled(IconButton)`
  > svg {
    border-radius: 50%;
    border: 1px solid var(--section-color);
    padding: 7px;
  }

  &:not(:disabled):not([aria-disabled="true"]):hover,
  &:not(:disabled):not([aria-disabled="true"]):focus-visible,
  &:not(:disabled):not([aria-disabled="true"]).focus-visible {
    > svg {
      outline: 1px solid var(--section-color);
    }
  }
`;

export const SectionHeader = styled.h2`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SectionContent = styled.div`
  grid-gap: var(--PADDING_SMALL, 20px);
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  margin-block-start: var(--PADDING_SMALL, 20px);

  &:not([hidden]) {
    display: grid;
  }
`;
