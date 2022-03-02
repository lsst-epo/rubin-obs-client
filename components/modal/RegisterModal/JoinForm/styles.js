import styled from "styled-components";
import { FormButtons as BaseFormButtons } from "@/components/form";
import { fluidScale } from "@/styles/globalStyles";

export const JoinAsButtons = styled(BaseFormButtons)`
  margin-block-end: ${fluidScale("30px", "20px")};
`;

export const SSOButtons = styled.div`
  margin-block-start: ${fluidScale("30px", "36px")};
  margin-block-end: ${fluidScale("40px", "15px")};

  > * + * {
    margin-block-start: 10px;
  }
`;
