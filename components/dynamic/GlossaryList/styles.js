import styled from "styled-components";

export const AlphaList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40px, 1fr));
  gap: 4px;
  margin-block-end: 60px;
`;

export const AlphaItem = styled.li``;

export const AlphaButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border: 1px solid #707070;
  font-weight: bold;
  transition: color 0.2s, background-color 0.2s;

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &[aria-pressed="true"] {
    border-color: var(--turquoise60);
    background: var(--turquoise60);
    color: var(--white);
  }
`;

export const TermGroup = styled.div`
  break-inside: avoid;
  margin-block-end: 100px;
`;

export const TermGroupHeader = styled.h2`
  margin-block-end: 30px;
`;

export const TermList = styled.ul`
  break-inside: avoid;
`;

export const TermLink = styled.a`
  color: var(--turquoise80);
`;
