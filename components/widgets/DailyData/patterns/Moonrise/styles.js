import styled from "styled-components";

export const Table = styled.table`
  grid-column: 1/-1;
  border-collapse: collapse;
  font-size: 0.75rem;
`;
export const Header = styled.thead``;
export const HeaderCell = styled.th`
  background-color: #313333;
  border-spacing: 0;
  border: 5px solid var(--black, #000);
  font-weight: normal;
  height: 40px;
  padding: 0;

  &[scope="row"] {
    font-size: 0.75em;
  }
`;
export const TableCell = styled.td`
  background-color: #313333;
  border-spacing: 0;
  border: 5px solid var(--black, #000);
  font-size: 0.75em;
  height: 40px;
  padding: 0;
  text-align: center;
`;
