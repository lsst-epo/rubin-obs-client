import styled from "styled-components";
import { MixedLink } from "@rubin-epo/epo-react-lib";
import {
  BREAK_MOBILE_MIN,
  BREAK_PHABLET,
  fluidScale,
} from "@/styles/globalStyles";

export const Header = styled.h2`
  margin-bottom: ${fluidScale("100px", "60px")};
  font-size: ${fluidScale("25px", "18px")};
`;

export const Link = styled(MixedLink)`
  margin-top: 40px;
`;

export const KeyNumbersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-auto-rows: 1fr;
  grid-gap: 20px;

  @media (min-width: ${BREAK_MOBILE_MIN}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: ${BREAK_PHABLET}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const KeyNumbersGridItem = styled.div`
  display: grid;
  grid-template-rows: minmax(150px, 2fr) minmax(75px, 100px);
  grid-gap: 0;
  color: var(--turquoise85, #12726d);
  text-align: center;
  background-color: var(--turquoise10);
  border-radius: 18px;
`;

export const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
`;

export const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
  overflow: hidden;
  font-size: ${fluidScale("20px", "16px")};
  font-weight: 600;
  color: var(--white);
  word-break: break-word;
  background-color: var(--turquoise85, #12726d);
  border-radius: 0 0 18px 18px;
`;

export const KeyNumber = styled.div`
  width: 100%;
`;

export const Heading = styled.span`
  font-size: ${fluidScale("90px", "40px")};
  font-weight: 800;
  line-height: 1;
`;

export const Postscript = styled.span`
  font-size: ${fluidScale("60px", "20px")};
  font-weight: 600;
  line-height: 1;
  word-break: break-word;
`;

export const Subheading = styled.div`
  width: 100%;
  font-size: ${fluidScale("35px", "16px")};
  font-weight: 600;
  word-break: break-word;
`;
