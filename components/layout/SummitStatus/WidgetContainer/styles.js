import styled from "styled-components";
import { token } from "@/styles/globalStyles";

export const WidgetContainer = styled.div`
  padding: 15px 20px;
  color: #fff;
  background-color: none;
  border-radius: 10px;

  @media screen and (min-width: ${token("BREAK_DESKTOP_SMALL")}) {
    background-color: black;
  }
`;

export const HeaderText = styled.p`
  font-size: 90%;
`;

export const FooterText = styled.p`
  margin: 20px 0px 0px;
  font-size: 70%;
  text-align: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;
  margin-inline: auto;
`;
