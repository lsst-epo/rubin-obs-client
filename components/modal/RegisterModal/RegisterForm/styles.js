import styled from "styled-components";
import { FormButtons as BaseFormButtons } from "@rubin-epo/epo-react-lib";

export const Form = styled.form`
  max-width: 550px;
  margin-block-start: 30px;

  > * + * {
    margin-block-start: 30px;
  }
`;

export const FormButtons = styled(BaseFormButtons)`
  margin-block-start: 44px;
`;
