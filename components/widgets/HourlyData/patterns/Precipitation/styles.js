import styled from "styled-components";
import { HourlyDataItem } from "../../styles";
export {
  HourlyDataBackground,
  HourlyDataList,
  HourlyDataTitle,
  Time,
} from "../../styles";

export const PreciptationHourlyItem = styled(HourlyDataItem)`
  gap: calc(var(--PADDING_SMALL, 20px) / 2);
`;

export const Probability = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 275%;
  font-variant-numeric: tabular-nums;
  line-height: 0.75;
`;
