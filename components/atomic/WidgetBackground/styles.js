import styled from "styled-components";

const variants = {
  primary: "var(--turquoise85, #12726d)",
  secondary: "#313333",
};

export const WidgetBackground = styled.div`
  --widget-background-color: ${({ $variant = "primary" }) =>
    variants[$variant]};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: var(--PADDING_SMALL, 20px);
  font-size: 0.75rem;
  background-color: var(--widget-background-color);
  border-radius: calc(var(--PADDING_SMALL, 20px) / 2);
`;
