import styled from "styled-components";

export const Table = styled.table`
  grid-column: 1/-1;
  font-size: 0.75rem;
  border-collapse: collapse;
`;
export const Header = styled.thead``;
export const HeaderCell = styled.th`
  height: 40px;
  padding: 0;
  font-weight: normal;
  border-spacing: 0;
  background-color: #313333;
  border: 5px solid var(--black, #000);

  &[scope="row"] {
    font-size: 0.75em;
  }
`;
export const TableCell = styled.td`
  height: 40px;
  padding: 0;
  font-size: 0.75em;
  text-align: center;
  border-spacing: 0;
  background-color: #313333;
  border: 5px solid var(--black, #000);
`;
