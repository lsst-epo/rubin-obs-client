import styled, { css } from "styled-components";

export const TableWrapper = styled.div`
  max-width: 100vw;
  width: 100%;
  overflow: scroll;
`;

export const Table = styled.table`
  width: 100%;

  ${({ $styleAs }) =>
    $styleAs === "secondary"
      ? css`
          --ComplexTable-cell-bg: var(--neutral10);
          --ComplexTable-border: 0;
          border-spacing: 5px;
        `
      : css`
          --ComplexTable-border: 1px solid var(--black);
          --ComplexTable-cell-bg: none;
          border-collapse: collapse;
        `}
`;

// export const Table = styled.div`
//   display: grid;
//   grid-auto-columns: auto;
//   grid-auto-rows: auto;
//   grid-auto-flow: dense;
//   overflow-x: auto;
//   padding: 1px;
//   border-collapse: collapse;
// `;

export const TableRow = styled.div`
  &:nth-child(odd) {
    background-color: var(--neutral10);
  }
`;

export const TableCell = styled.div`
  ${({ $row, $background }) =>
    css`
      background-color: ${$background || "var(--ComplexTable-cell-bg)"};
      color: ${$background ? "var(--black)" : "inherit"};
      grid-row: ${$row};
    `};

  ${({ $colWidth }) => `grid-column: span ${$colWidth};`}

  border: var(--ComplexTable-border);
  padding: 20px;
  margin-block-end: -1px;
  margin-inline-end: -1px;
`;
