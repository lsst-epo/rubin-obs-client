import styled from "styled-components";
import { fluidScale } from "@/styles/globalStyles";

export const TabList = styled.div`
  display: flex;
  justify-content: end;
  flex-wrap: wrap;
  margin-inline-start: -20px;
  margin-block-end: -10px;
`;

export const Tab = styled.button`
  display: block;
  flex: 1 1 auto;
  background-color: var(--orange20);
  border: 4px solid var(--orange20);
  padding: 15px 32px;
  min-height: ${fluidScale("90px", "70px")};
  max-width: 373px;
  font-weight: bold;
  margin-inline-start: 20px;
  margin-block-end: 10px;
  transition: color 0.2s, background-color 0.2s, border-color 0.2s;

  &[aria-selected="true"] {
    background-color: #f80;
    border-color: #db5400;
  }
`;
