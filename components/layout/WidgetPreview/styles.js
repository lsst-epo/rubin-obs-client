import styled from "styled-components";

const columns = {
  small: 1,
  medium: 2,
  large: 4,
  full: 6,
};

export const PreviewPanel = styled.section`
  --widget-grid-gap: var(--PADDING_SMALL, 20px);
  --panel-columns: ${({ $size }) => columns[$size]};

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 2rem 10rem 2rem;
  grid-template-areas:
    "header"
    "content"
    "callout";
  grid-gap: var(--widget-grid-gap);
  grid-column: span min(var(--panel-columns), var(--widget-columns));
  background-color: var(--black, #000);
  border-bottom-right-radius: 0.75rem;
  border-bottom-left-radius: 0.75rem;
`;

export const PreviewHeader = styled.header`
  color: var(--black, #000);
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #d9d9d9;
  padding: 0 0.5rem;
`;

export const PreviewTitle = styled.h2`
  font-size: 80%;
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;

  > svg {
    transition: stroke-width 0.2s;
  }

  &:not(:disabled):not([aria-disabled="true"]):hover,
  &:not(:disabled):not([aria-disabled="true"]):focus-visible,
  &:not(:disabled):not([aria-disabled="true"]).focus-visible {
    > svg {
      stroke-width: 2;
    }
  }
`;

export const PreviewContent = styled.div`
  grid-area: content;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(var(--panel-columns), 1fr);
  grid-gap: var(--widget-grid-gap);
  padding-inline: var(--widget-grid-gap);
  color: var(--white, #fff);
`;

export const PreviewCallout = styled.p`
  grid-area: callout;
  color: var(--white, #fff);
  font-size: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
