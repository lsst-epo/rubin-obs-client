import styled from "styled-components";
import { containerNarrow, respond } from "@/styles/globalStyles";
import { Container } from "@rubin-epo/epo-react-lib";

export const Tile = styled.div`
  ${containerNarrow()}
  display: grid;
  grid-gap: 20px;
  padding: 30px;
  background-color: var(--neutral10);
`;

export const ContainerDesktop = styled(Container)`
  h4:not(:first-of-type) {
    margin-top: 1rem;
  }

  ${respond(`display: none;`)}
  > div {
    display: grid;
    grid-template: auto / 2fr 1fr;
    grid-gap: 20px;
    font-size: 16px;
  }
`;

export const Details = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-gap: 10px 20px;
`;

export const ContainerMobile = styled(Container)`
  > div {
    display: none;
    font-size: 14px;

    h4:not(:first-of-type) {
      margin-top: 1rem;
    }

    p:first-of-type {
      display: inline-block;
    }

    ${respond(`display: block;
      padding-top: 1rem;`)}
  }
`;
