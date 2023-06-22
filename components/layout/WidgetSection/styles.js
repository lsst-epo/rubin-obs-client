import IconButton from "@/components/atomic/Button/IconButton";
import { BREAK_PHABLET_MIN } from "@/styles/globalStyles";
import styled from "styled-components";

export const WidgetSection = styled.section`
  --section-color: var(--white, #fff);

  padding: var(--PADDING_SMALL, 20px);
  color: var(--section-color);
  background-color: var(--black, #000);
  border-radius: 10px;

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
  text-align: left;

  > svg {
    flex-shrink: 0;
    padding: 7px;
    border: 1px solid var(--section-color);
    border-radius: 50%;
  }

  &:not(:disabled, [aria-disabled="true"]):hover,
  &:not(:disabled, [aria-disabled="true"]):focus-visible,
  &:not(:disabled, [aria-disabled="true"]).focus-visible {
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
  --grid-columns: repeat(2, 1fr);

  grid-gap: var(--PADDING_SMALL, 20px);
  grid-template-columns: var(--grid-columns);
  grid-auto-rows: 10rem;
  margin-block-start: var(--PADDING_SMALL, 20px);

  &:not([hidden]) {
    display: grid;
  }

  @media screen and (min-width: ${BREAK_PHABLET_MIN}) {
    --grid-columns: repeat(4, 1fr);
  }
`;
