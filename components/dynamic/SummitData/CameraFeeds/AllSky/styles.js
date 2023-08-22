import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: repeat(2, 1fr);
  grid-column: 1 / -1;
  gap: var(--widget-padding);
`;
