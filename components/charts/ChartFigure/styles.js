import styled from "styled-components";

export const Caption = styled.figcaption`
  text-align: center;
`;
export const Content = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  overflow: auto hidden;
  scrollbar-color: var(--white, #fff) rgba(255, 255, 255, 20%);
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    height: 8px;
    background-color: rgba(255, 255, 255, 50%); /* or add it to the track */
    background-clip: padding-box;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--white, #fff);
    border-radius: 4px;
  }
`;
