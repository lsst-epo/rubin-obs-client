import styled from "styled-components";

export const WidgetWrapper = styled.div`
  background-color: var(--turquoise85, #12726d);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: var(--PADDING_SMALL, 20px);
`;
export const WidgetLabel = styled.h3`
  font-weight: normal;
  line-height: 1;
`;
export const WidgetUnit = styled.span`
  line-height: 1;
`;
export const WidgetValue = styled.span`
  font-size: 400%;
  line-height: 1;
`;
