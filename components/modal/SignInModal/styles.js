import styled from "styled-components";
import { fluidScale } from "@/styles/globalStyles";
import { FormButtons as BaseFormButtons } from "@rubin-epo/epo-react-lib";

export const SignInAsButtons = styled(BaseFormButtons)`
  margin-block: ${fluidScale("30px", "20px")};
`;

export const SSOButtons = styled.div`
  margin-block-start: 30px;

  > * + * {
    margin-block-start: 10px;
  }
`;

export const Form = styled.form`
  margin-block-start: ${fluidScale("56px", "30px")};

  > * + * {
    margin-block-start: 30px;
  }
`;

export const AccountLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  margin-block: 10px 30px;
`;

export const FormButtons = styled(BaseFormButtons)`
  margin-block-start: 44px;
`;
