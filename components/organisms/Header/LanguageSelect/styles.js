import styled from "styled-components";
import { Switch as FormSwitch } from "@rubin-epo/epo-react-lib";

export const Fieldset = styled.fieldset`
  display: flex;
  align-items: center;
  padding: 0;
  border: 0;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-weight: 700;

  ${({ $disabled }) => $disabled && `pointer-events: none;`}
`;

export const Switch = styled(FormSwitch)`
  --Switch-Toggle-color: var(--turquoise90);
  --Switch-background-color: var(--turquoise50);
  --Switch-Inner-before-content: "En";
  --Switch-Inner-after-content: "Es";
`;
