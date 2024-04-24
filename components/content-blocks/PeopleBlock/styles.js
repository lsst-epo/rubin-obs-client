import styled from "styled-components";
import { ResponsiveImage } from "@rubin-epo/epo-react-lib";
import { BREAK_TABLET, BREAK_MOBILE, fluidScale } from "@/styles/globalStyles";

export const Header = styled.h2`
  margin-bottom: ${fluidScale("100px", "60px")};
  font-size: ${fluidScale("25px", "18px")};
`;

export const PeopleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-auto-rows: 1fr;
  grid-gap: 20px;

  @media (min-width: ${BREAK_MOBILE}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${BREAK_TABLET}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const PeopleList = styled.div`
  margin: 0;
`;

export const PeopleGridItem = styled.div`
  padding: 30px;
  background-color: var(--neutral10);
`;

export const PeopleListItem = styled.div`
  padding: 20px;
  background-color: var(--neutral10);

  & + & {
    margin-top: 12px;
  }
`;

export const PersonImage = styled(ResponsiveImage)`
  border-radius: 50%;
`;

export const Affiliation = styled.div`
  font-size: ${fluidScale("18px", "14px")};

  ${PersonImage} + & {
    margin-top: 10px;
  }
`;

export const Name = styled.div`
  font-size: ${fluidScale("25px", "22px")};
  font-weight: 600;
  line-height: 1;

  ${Affiliation} + & {
    margin-top: 18px;
  }

  & + ${Affiliation} {
    margin-top: 10px;
  }
`;
