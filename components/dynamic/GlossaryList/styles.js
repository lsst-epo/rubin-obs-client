import styled from "styled-components";

export const AlphaList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40px, 1fr));
  gap: 4px;
  margin-block-end: 60px;
`;

export const AlphaButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-weight: bold;
  border: 1px solid #707070;
  transition: color 0.2s, background-color 0.2s;

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  &[aria-pressed="true"] {
    color: var(--white);
    background: var(--turquoise60);
    border-color: var(--turquoise60);
  }
`;

export const TermGroup = styled.div`
  margin-block-end: 100px;
  break-inside: avoid;
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
