import styled from "styled-components";
import {
  CONTAINER_REGULAR,
  tokens,
  protoContainer,
  fluidScale,
} from "@/styles/globalStyles";

export const Wrapper = styled.div`
  width: 100%;

  ${protoContainer(tokens.CONTAINER_NARROW)}
  --max-width: ${CONTAINER_REGULAR};

  padding-block-start: ${fluidScale("50px", "30px")};
  padding-block-end: ${fluidScale("50px", "40px")};
  margin-block-end: 60px;
  background-color: ${(p) => tokens[p.$bgColor]};

  ${({ $nested }) =>
    $nested &&
    `
    width: calc(100% + 2 * var(--PageContent-Main-padding-inline));
    margin-block-start: calc(-1 * var(--PageContent-Main-padding-block-start));
    margin-inline-start: calc(-1 * var(--PageContent-Main-padding-inline));
  `}
`;
