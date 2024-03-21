import styled from "styled-components";
import { Figure as Fig } from "@rubin-epo/epo-react-lib";
import { aHidden } from "@/styles/mixins/appearance";

export const Figure = styled(Fig)`
  figcaption {
    text-align: center;
  }
`;

export const PreviewFigure = styled(Fig)`
  display: block;
  width: 100%;
  height: 100%;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  figcaption {
    ${aHidden}
  }
`;
