import IconButton from "@/components/atomic/Button/IconButton";
import styled from "styled-components";
import { token } from "@/styles/globalStyles";

const mobileColumns = {
  small: 1,
  medium: 1,
  large: 1,
  full: 1,
};
const tabletColumns = {
  small: 1,
  medium: 1,
  large: 2,
  full: 3,
};
const desktopColumns = {
  small: 1,
  medium: 2,
  large: 4,
  full: 6,
};

export const PreviewPanel = styled.section`
  --widget-grid-gap: var(--PADDING_SMALL, 20px);
  --panel-columns: ${({ $size }) => mobileColumns[$size]};

  display: grid;
  grid-template: "header" 2rem "content" auto "callout" 2rem / 1fr;
  grid-gap: var(--widget-grid-gap);
  grid-column: span min(var(--panel-columns), var(--widget-columns));
  grid-gap: var(--widget-grid-gap);
  background-color: var(--black, #000);
  border-bottom-right-radius: 0.75rem;
  border-bottom-left-radius: 0.75rem;

  @media screen and (min-width: ${token("BREAK_TABLET_MIN")}) {
    --panel-columns: ${({ $size }) => tabletColumns[$size]};
  }

  @media screen and (min-width: ${token("BREAK_DESKTOP_SMALL")}) {
    --panel-columns: ${({ $size }) => desktopColumns[$size]};
  }
`;

export const PreviewHeader = styled.h2`
  display: flex;
  grid-area: header;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
  font-size: 80%;
  color: var(--black, #000);
  background-color: #d9d9d9;
`;

export const PreviewIconButton = styled(IconButton)`
  > svg {
    transition: stroke-width 0.2s;
  }

  &:not(:disabled, [aria-disabled="true"]):hover,
  &:not(:disabled, [aria-disabled="true"]):focus-visible,
  &:not(:disabled, [aria-disabled="true"]).focus-visible {
    > svg {
      stroke-width: 2;
    }
  }
`;

export const PreviewContent = styled.div`
  display: grid;
  grid-auto-rows: 10rem;
  grid-template-columns: repeat(var(--panel-columns), 1fr);
  grid-gap: var(--widget-grid-gap);
  padding-inline: var(--widget-grid-gap);
  color: var(--white, #fff);
`;

export const PreviewCallout = styled.p`
  display: flex;
  grid-area: callout;
  align-items: center;
  justify-content: center;
  font-size: 90%;
  color: var(--white, #fff);
`;
