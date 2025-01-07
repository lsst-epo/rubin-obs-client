import styled from "styled-components";

export const Title = styled.h3`
  position: relative;
  padding-right: 1em;
  padding-bottom: 0.5em;
  margin-bottom: 0.5em;
  border-bottom: 8px solid var(--color-background-accent-aside);

  & svg {
    position: absolute;
    top: 4px;
    right: 0;
    display: block;
    width: 32px;
    height: 32px;
    padding: 8px;
    overflow: visible;
    background-color: var(--turquoise60);
    border-radius: 50%;
    fill: var(--white);
  }
`;
