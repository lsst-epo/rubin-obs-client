import styled from "styled-components";

export const Figure = styled.figure`
  background-color: var(--turquoise85, #12726c);
  border-radius: 10px;
  color: var(--white, #fff);
  padding: var(--PADDING_SMALL, 20px);

  & > * + * {
    margin-block-start: var(--PADDING_SMALL, 20px);
  }
`;
export const Caption = styled.figcaption`
  text-align: center;
`;
export const Content = styled.div`
  overflow-x: auto;
  position: relative;

  scrollbar-color: var(--white, #fff) transparent;

  &::-webkit-scrollbar {
    height: 8px;
    background-color: transparent; /* or add it to the track */
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: var(--white, #fff);
  }
`;
