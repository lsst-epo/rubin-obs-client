import styled from "styled-components";

export const ScrollableHorizontalWrapper = styled.div`
  width: 100%;
  height: 100%;
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
