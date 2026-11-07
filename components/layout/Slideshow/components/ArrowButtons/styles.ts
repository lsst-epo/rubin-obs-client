import styled from "styled-components";

export const ArrowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  inline-size: 36px;
  block-size: 36px;
  padding-inline-end: 3px;
  color: var(--black, #000);
  background-color: var(--turquoise50, #00babc);
  border-radius: 36px;
  transition: background-color 0.2s;

  &:hover {
    background-color: hsla(181deg, 76%, 54%, 100%);
  }

  & svg {
    inline-size: 18px;
    block-size: 18px;
  }
`;

export const NextArrow = styled(ArrowButton)`
  transform: rotate(180deg);
`;
