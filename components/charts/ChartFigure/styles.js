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

  scrollbar-color: var(--white, #fff) rgba(255, 255, 255, 0.2);
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    height: 8px;
    background-clip: padding-box;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
    background-color: rgba(255, 255, 255, 0.5); /* or add it to the track */
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: var(--white, #fff);
  }
`;
