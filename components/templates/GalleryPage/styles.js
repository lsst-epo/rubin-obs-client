import styled from "styled-components";
import Container from "@/layout/Container";
import { containerNarrow, respond } from "@/styles/globalStyles";

export const Tile = styled.div`
  ${containerNarrow()}
  display: grid;
  grid-gap: 20px;
  padding: 30px;
  background-color: var(--neutral10);
`;

export const Image = styled.img`
  aspect-ratio: 4 / 3;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
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

  &:not(:first-child) {
    margin-top: 10px;
  }
`;

export const ContainerMobile = styled(Container)`
  --Metadata-item-display: inline;

  > div {
    display: none;
    font-size: 14px;

    ${respond(`
      display: block;
      padding-top: 1rem;
    `)}

    h4:not(:first-of-type) {
      margin-top: 1rem;
    }
  }
`;

export const AccordionInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
