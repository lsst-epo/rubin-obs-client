import styled from "styled-components";
import {
  containerNarrow,
  containerRegular,
  tokens,
} from "@/styles/globalStyles";

export const Section = styled.section`
  background-color: ${(p) => tokens[p.$bgColor]};

  + section {
    padding-top: 0;
  }
`;

export const Inner = styled.div`
  ${(p) => (p.$width === "narrow" ? containerNarrow() : containerRegular())}
`;
