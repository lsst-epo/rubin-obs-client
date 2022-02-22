import styled from "styled-components";
import {
  containerNarrow,
  containerRegular,
  PADDING_LARGE,
  PADDING_MEDIUM,
  PADDING_SMALL,
  tokens,
} from "@/styles/globalStyles";

function getPadding(padding) {
  switch (padding) {
    case "none":
      return 0;
    case "medium":
      return PADDING_MEDIUM;
    case "small":
      return PADDING_SMALL;
    default:
      return PADDING_LARGE;
  }
}

export const Section = styled.section`
  background-color: ${(p) => tokens[p.$bgColor]};
  padding-block-start: ${(p) => getPadding(p.$paddingSize)};
  padding-block-end: ${(p) => getPadding(p.$paddingSize)};

  + section {
    padding-top: 0;
  }
`;

export const Inner = styled.div`
  ${(p) => (p.width === "narrow" ? containerNarrow() : containerRegular())}
`;
