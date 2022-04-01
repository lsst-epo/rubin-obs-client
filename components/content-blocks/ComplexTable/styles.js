import styled, { css } from "styled-components";

export const TableWrapper = styled.div`
  max-width: 100vw;
  width: 100%;
  overflow: scroll;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  ${({ $styleAs }) =>
    $styleAs === "secondary"
      ? css`
          --ComplexTable-cell-bg: var(--neutral10);
          --ComplexTable-border: 5px solid var(--white);
          border-style: hidden;
        `
      : css`
          --ComplexTable-border: 1px solid var(--black);
          --ComplexTable-cell-bg: none;
        `}
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

  border: var(--ComplexTable-border);
  padding: 20px;
`;
