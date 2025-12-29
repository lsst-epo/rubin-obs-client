import styled from "styled-components";
import { fluidScale } from "@/styles/globalStyles";

const variants = {
  primary: "var(--turquoise85, #12726d)",
  secondary: "#313333",
};

export const WidgetBackground = styled.div`
  --widget-background-color: ${({ $variant = "primary" }) =>
    variants[$variant]};
  --widget-padding: ${fluidScale("10px", "5px")};

  display: flex;
  flex-direction: column;
  place-self: center center;
  align-items: center;
  justify-content: space-between;
  width: 65%;
  padding: var(--widget-padding);
  font-size: 0.75rem;
  background-color: var(--widget-background-color);
  border-radius: calc(var(--widget-padding) / 2);
`;
