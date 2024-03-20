import styled from "styled-components";
import { layoutGrid, respond } from "@/styles/globalStyles";
import { Container } from "@rubin-epo/epo-react-lib";

export const PaginationContainer = styled(Container)`
  a {
    color: var(--turquoise85);

    &:hover,
    &:focus-visible {
      color: var(--turquoise85);
    }
  }
`;

export const NavDesktop = styled.nav`
  ${layoutGrid(3)}
  ${respond(`display: none;`)}
  > div:nth-child(2) {
    justify-self: center;
  }

  > div:nth-child(3) {
    justify-self: end;
    text-transform: uppercase;
  }
`;

export const NavMobile = styled.nav`
  display: none;
  ${respond(`    
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr;

    >div:last-child {
      justify-self: end;
    }
`)}
`;

export const PaginationList = styled.ul`
  display: flex;
  gap: 5px;
`;
