import styled from "styled-components";
import { fluidScale } from "@/styles/globalStyles";

export const TabList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
  margin-block-end: -10px;
  margin-inline-start: -20px;
`;

export const Tab = styled.button`
  display: block;
  flex: 1 1 auto;
  max-width: 373px;
  min-height: ${fluidScale("90px", "70px")};
  padding: 15px 32px;
  margin-block-end: 10px;
  margin-inline-start: 20px;
  font-weight: bold;
  background-color: var(--orange20);
  border: 4px solid var(--orange20);
  transition: color 0.2s, background-color 0.2s, border-color 0.2s;

  &[aria-selected="true"] {
    background-color: #f80;
    border-color: #db5400;
  }
`;
