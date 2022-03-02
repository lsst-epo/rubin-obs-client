import styled from "styled-components";
import { fluidScale } from "@/styles/globalStyles";
import { FormButtons as BaseFormButtons } from "@/components/form";

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
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-block-start: 10px;
  margin-block-end: 30px;
`;

export const FormButtons = styled(BaseFormButtons)`
  margin-block-start: 44px;
`;
