import styled from "styled-components";
import { BREAK_TABLET_LG } from "../../constants";

export const SlideDescriptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-block: 24px;
  font-size: 16px;
  line-height: 1.3;

  @media (min-width: ${BREAK_TABLET_LG}) {
    position: absolute;
    inset-block-end: 20px;
    inset-inline-start: 20px;
    gap: 0px;
    max-inline-size: 494px;
    max-block-size: 90%;
    padding-block: 0px;
    overflow: hidden;
    color: var(--white, #fff);
    background-color: hsla(0deg, 0%, 0%, 70%);
    border: 1.5px solid rgba(255, 255, 255, 40%);
    border-radius: 12px;
  }
`;

export const ControlsTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: ${BREAK_TABLET_LG}) {
    display: none;
  }
`;

export const ControlsBottom = styled.div`
  display: none;
  align-items: center;
  justify-content: space-between;

  @media (min-width: ${BREAK_TABLET_LG}) {
    display: flex;
    padding-block: 20px;
    padding-inline: 30px 20px;
    background-color: hsla(0deg, 0%, 0%, 40%);
  }
`;

export const Buttons = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
