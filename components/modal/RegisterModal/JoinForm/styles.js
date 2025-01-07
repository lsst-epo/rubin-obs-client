import styled from "styled-components";
import { FormButtons as BaseFormButtons } from "@rubin-epo/epo-react-lib";
import { fluidScale } from "@/styles/globalStyles";

export const JoinAsButtons = styled(BaseFormButtons)`
  margin-block-end: ${fluidScale("30px", "20px")};
`;

export const SSOButtons = styled.div`
  margin-block: ${fluidScale("30px", "36px")} ${fluidScale("40px", "15px")};

  > * + * {
    margin-block-start: 10px;
  }
`;
