import styled from "styled-components";
import { fluidScale } from "@/styles/globalStyles";
import { FormButtons as BaseFormButtons } from "@rubin-epo/epo-react-lib";

export const AuthButtons = styled(BaseFormButtons)`
  margin-block: ${fluidScale("30px", "20px")};
`;
