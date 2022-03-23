import styled from "styled-components";
import {
  containerFullBleed,
  tokens,
  protoContainer,
  fluidScale,
} from "@/styles/globalStyles";

export const Wrapper = styled.div`
  background-color: ${(p) => tokens[p.$bgColor]};
  ${protoContainer(tokens.CONTAINER_NARROW)}
  ${containerFullBleed("CONTAINER_REGULAR")}
  padding-block-start: ${fluidScale("50px", "30px")};
  padding-block-end: ${fluidScale("50px", "40px")};
  margin-block-end: 60px;
`;
