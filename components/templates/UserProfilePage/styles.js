import styled from "styled-components";
import { Button as AtomicButton } from "@/components/atomic";
import { FormField } from "@/components/form";
import { fluidScale, respond } from "@/styles/globalStyles";

const BREAKPOINT = "600px";

export const Header = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75em;

  > :first-child {
    flex-grow: 999;
  }

  > :last-child {
    flex-grow: 1;
    flex-shrink: 0;
  }
`;

export const PageTitle = styled.h1`
  display: flex;
  gap: 1em;
  align-items: center;
  font-size: ${fluidScale("28px", "24px")};

  svg {
    transform: translateY(2px);
  }
`;

export const Form = styled.form`
  --FormField-Label-font-size: ${fluidScale("25px", "20px")};
  --FormField-Label-font-weight: 400;
  --FormField-InputWrapper-padding-block-start: 0;
  --Input-padding-block: 13px;
`;

export const Section = styled.section`
  margin-block-start: 2.727em;
`;

export const SectionTitle = styled.h2`
  padding-block-end: 1.2em;
  border-bottom: 1px solid;
  font-size: ${fluidScale("25px", "20px")};
`;

export const Status = styled(SectionTitle)`
  border-bottom: none;
`;

const fieldStyles = `
  align-items: center;
  row-gap: 6px;
  column-gap: min(4vw, 45px);
  margin-block-start: 1.364em;
`;

export const Field = styled(FormField)`
  display: grid;
  grid-template-columns: 1fr 68%;
  ${fieldStyles}

  ${respond(`grid-template-columns: 1fr 1fr;`, BREAKPOINT)}
`;

export const ResponsiveField = styled(FormField)`
  display: grid;
  grid-template-columns: 1fr 68%;
  ${fieldStyles}

  ${respond(`grid-template-columns: 100%;`, BREAKPOINT)}
`;

export const FlexField = styled(FormField)`
  display: flex;
  justify-content: space-between;
  ${fieldStyles}
`;

export const Button = styled(AtomicButton)`
  width: 100%;
  margin-block-start: 2.727em;
  padding-block: 13px;
  font-size: 20px;
`;
