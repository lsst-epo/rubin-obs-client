import IconButton from "@/components/atomic/Button/IconButton";
import { BREAK_PHABLET_MIN } from "@/styles/globalStyles";
import styled from "styled-components";

export const WidgetSection = styled.section`
  --section-color: var(--white, #fff);
  --widget-background-color: #313333;

  display: flex;
  flex-direction: column;
  min-height: 170px;
  padding: 10px 10px 0px;
  color: var(--section-color);
  background-color: var(--widget-background-color);
  border-radius: 10px;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: normal;
  }
`;

export const SectionIconButton = styled(IconButton)`
  text-align: left;

  > svg {
    flex-shrink: 0;
    padding: 7px;
    border: 1px solid var(--section-color);
    border-radius: 50%;
  }

  &:not(:disabled, [aria-disabled="true"]):hover,
  &:not(:disabled, [aria-disabled="true"]):focus-visible,
  &:not(:disabled, [aria-disabled="true"]).focus-visible {
    > svg {
      outline: 1px solid var(--section-color);
    }
  }
`;

export const SectionHeader = styled.h2`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SectionTitle = styled.p`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size: small;
  text-align: center;
`;

export const SectionCaption = styled.p`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size: small;
  color: ${(props) => (props.$offline ? "#CF4040" : "white")};
  text-align: center;
`;

export const SectionContent = styled.div`
  --grid-columns: repeat(2, 1fr);

  grid-template-columns: var(--grid-columns);
  grid-auto-rows: fit-content(10rem);
  grid-gap: 0px;

  &:not([hidden]) {
    display: grid;
  }

  @media screen and (min-width: ${BREAK_PHABLET_MIN}) {
    --grid-columns: repeat(3, 1fr);
  }
`;

export const SectionSubHeader = styled.h3`
  grid-column: 1/-1;
`;

export const SectionFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  margin-top: auto;
`;
