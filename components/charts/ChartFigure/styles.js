import styled from "styled-components";
import WidgetBackground from "@/components/atomic/WidgetBackground";

export const Caption = styled.figcaption`
  text-align: center;
`;
export const Content = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  position: relative;
  overflow-x: auto;
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
