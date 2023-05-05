import styled from "styled-components";
import { ColorSwatch } from "@rubin-epo/epo-react-lib";

export const Legends = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--PADDING_SMALL, 20px);
`;

export const Legend = styled.div`
  display: flex;
  align-items: center;
  gap: 1ch;
`;

export const LegendTitle = styled.span``;

export const LegendColor = styled(ColorSwatch)`
  > span {
    border-color: var(--white, #fff);
  }
`;
