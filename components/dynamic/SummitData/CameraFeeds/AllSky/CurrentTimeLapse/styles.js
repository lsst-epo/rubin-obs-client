import styled from "styled-components";
import { Figure as Fig } from "@rubin-epo/epo-react-lib";

export const Figure = styled(Fig)`
  figcaption {
    text-align: center;
  }
`;

export const Wrapper = styled.div`
  position: relative;
  display: block;
  padding-top: 100%;

  .react-player {
    position: absolute;
    top: 0;
    left: 0;
  }
`;
