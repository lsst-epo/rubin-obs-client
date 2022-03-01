import styled from "styled-components";
import { fluidScale } from "@/styles/globalStyles";

export const Group = styled.div`
  & + & {
    padding-block-start: 30px;
  }
`;

export const Label = styled.label`
  display: block;
  font-weight: 600;
  font-size: ${fluidScale("20px", "16px")};
  line-height: 1.5;
`;

export const Error = styled.p`
  color: #cf4040;
  font-size: ${fluidScale("20px", "16px")};
  margin-block-start: ${fluidScale("1px", "5px")};
`;

export const Description = styled.p`
  font-size: 14px;
  line-height: 1.5;
`;

export const InputWrapper = styled.div`
  padding-block-start: 9px;
`;
