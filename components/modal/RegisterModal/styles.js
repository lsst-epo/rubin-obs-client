import styled from "styled-components";
import { FormButtons as BaseFormButtons } from "@/components/form";
import { fluidScale } from "@/styles/globalStyles";

export const Inner = styled.div``;

export const ImageWrapper = styled.div``;

export const Form = styled.form`
  margin-block-start: 30px;
  max-width: 550px;
`;

export const FormButtons = styled(BaseFormButtons)`
  margin-block-start: 44px;
`;

export const RoleFormButtons = styled(BaseFormButtons)`
  margin-block-end: ${fluidScale("30px", "20px")};
`;

export const SSOButtons = styled.div`
  margin-block-start: ${fluidScale("30px", "36px")};
  margin-block-end: ${fluidScale("40px", "15px")};

  > * + * {
    margin-block-start: 10px;
  }
`;
