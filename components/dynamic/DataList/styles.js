import styled from "styled-components";
import { fluidScale } from "@/styles/globalStyles";

export const Header = styled.h2`
  margin-bottom: ${fluidScale("40px", "20px")};
  padding-bottom: 10px;
  border-bottom: 10px solid var(--turquoise85);
`;

export const Footer = styled.div`
  padding-top: 40px;
`;
