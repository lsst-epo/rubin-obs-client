import styled from "styled-components";
import { ColorSwatch } from "@rubin-epo/epo-react-lib";

export const Legends = styled.div`
  display: flex;
  gap: var(--PADDING_SMALL, 20px);
  align-items: center;
  justify-content: center;
`;

export const Legend = styled.div`
  display: flex;
  gap: 1ch;
  align-items: center;
`;

export const LegendColor = styled(ColorSwatch)`
  > span {
    border-color: var(--white, #fff);
  }
`;
