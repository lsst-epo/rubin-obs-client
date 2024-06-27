import styled from "styled-components";
import { fluidScale } from "@/styles/globalStyles";
import { MixedLink } from "@rubin-epo/epo-react-lib";

export const Header = styled.h2`
  margin-bottom: ${fluidScale("100px", "60px")};
  font-size: ${fluidScale("25px", "18px")};
`;

export const Link = styled(MixedLink)`
  margin-top: 40px;
`;

export const Publication = styled.a`
  display: block;
  padding: 18px 20px 14px;
  margin-top: 18px;
  text-decoration: none;
  background-color: var(--neutral10);
  border: 1px solid var(--neutral20, #dce0e3);
  outline: 6px solid transparent;
  outline-offset: 2px;
  transition: border 0.25s ease-in-out, outline 0.25s ease-in-out;

  &:hover {
    border: 1px solid transparent;
    outline: 6px solid var(--turquoise85, #12726d);
    transition: outline 0.25s ease-in-out;
  }
`;

export const Bold = styled.span`
  font-weight: 600;
`;

export const Title = styled.div`
  font-size: ${fluidScale("25px", "22px")};
  font-weight: 600;
`;

export const Author = styled.div`
  margin-top: 8px;
  font-size: ${fluidScale("18px", "14px")};
`;

export const Credit = styled.div`
  margin-top: 8px;
  font-size: ${fluidScale("18px", "14px")};
`;

export const PubDate = styled.div`
  margin-top: 8px;
  font-size: ${fluidScale("18px", "14px")};
`;
