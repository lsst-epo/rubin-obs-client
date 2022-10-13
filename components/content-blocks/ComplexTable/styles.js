import styled, { css } from "styled-components";
import { fluidScale } from "@/styles/globalStyles";

export const TableWrapper = styled.div`
  max-width: 100vw;
  width: 100%;
  overflow: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  ${({ $styleAs, $verticalAlignment = "top" }) =>
    $styleAs === "secondary"
      ? css`
          --ComplexTable-cell-bg: var(--neutral10);
          --ComplexTable-border: 5px solid var(--white);
          --ComplexTable-vertical-align: ${$verticalAlignment};
          border-style: hidden;
        `
      : css`
          --ComplexTable-border: 1px solid var(--black);
          --ComplexTable-cell-bg: none;
          --ComplexTable-vertical-align: ${$verticalAlignment};
        `}
`;

export const Caption = styled.caption`
  padding-block-end: 1em;
  font-size: 1.136em;
  font-weight: bold;
  text-align: start;
`;

export const TableRow = styled.tr`
  &:nth-child(odd) {
    background-color: var(--neutral10);
  }
`;

export const TableCell = styled.td`
  ${({ $background }) =>
    css`
      background-color: ${$background || "var(--ComplexTable-cell-bg)"};
      color: ${$background ? "var(--black)" : "inherit"};
    `};
  ${({ $hasFlexibleCellWidth }) =>
    $hasFlexibleCellWidth && `white-space: nowrap;`}

  min-width: ${fluidScale("180px", "110px")};
  border: var(--ComplexTable-border);
  padding: 20px;
  text-align: inherit;
  vertical-align: var(--ComplexTable-vertical-align);
`;
