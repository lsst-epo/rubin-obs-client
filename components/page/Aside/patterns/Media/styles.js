import styled from "styled-components";
import AsideSection from "../../Section";

export const AsidePrimary = styled.div`
  h3 {
    &:first-of-type {
      border-bottom: 8px solid var(--turquoise60);

      svg {
        position: absolute;
        top: 4px;
        right: 0;
        display: block;
        width: 32px;
        height: 32px;
        padding: 8px;
        overflow: visible;
        background-color: var(--turquoise60);
        border-radius: 50%;
        fill: var(--white);
      }
    }
  }
`;

export const MediaSection = styled(AsideSection)`
  & > a {
    display: block;
    margin-block-start: 1em;
  }
`;
