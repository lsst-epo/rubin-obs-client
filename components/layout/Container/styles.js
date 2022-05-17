import styled from "styled-components";
import {
  containerNarrow,
  containerRegular,
  containerWide,
  tokens,
} from "@/styles/globalStyles";

export const Section = styled.section`
  background-color: ${(p) => tokens[p.$bgColor]};

  + section {
    padding-top: 0;
  }
`;

export const Inner = styled.div`
  ${({ $width = "regular", $nested }) => {
    if ($nested) return ``;

    switch ($width) {
      case "narrow":
        return containerNarrow();
      case "wide":
        return containerWide();
      default:
        return containerRegular();
    }
  }}
`;
