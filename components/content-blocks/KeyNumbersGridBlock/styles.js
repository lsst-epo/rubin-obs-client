import styled from "styled-components";
import { MixedLink } from "@rubin-epo/epo-react-lib";

export const Header = styled.h2`
  margin-block-start: 3.166em;
  margin-block-end: 3.166em;
  font-size: 1.363rem;
  line-height: 1.5;
`;

export const Link = styled(MixedLink)`
  margin-top: 4.545rem;
`;

export const KeyNumbers = styled.dl`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--PADDING_SMALL);
`;

export const KeyNumber = styled.div`
  display: grid;
  grid-template-rows: 2fr 1fr;
  aspect-ratio: 1;
  overflow: hidden;
  color: var(--turquoise85, #12726d);
  text-align: center;
  background-color: var(--turquoise10);
  border-radius: 18px;
`;

export const Definition = styled.dd`
  display: flex;
  flex-direction: column;
  grid-row-start: 1;
  align-items: center;
  justify-content: flex-end;
  padding-block: var(--PADDING_SMALL);
  white-space: nowrap;
`;

export const Term = styled.dt`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--PADDING_SMALL);
  font-size: 0.909rem;
  font-weight: 600;
  color: var(--white);
  word-break: break-word;
  background-color: var(--turquoise85, #12726d);
`;

export const Number = styled.div`
  display: flex;
  gap: 0.5ch;
  align-items: baseline;
`;

export const Heading = styled.span`
  font-size: var(--size-text-heading-key-numbers, 4.09rem);
  font-weight: 800;
  line-height: 1;
`;

export const Postscript = styled.span`
  font-size: var(--size-text-postscript-key-numbers, 2.727rem);
  font-weight: 600;
  line-height: 1;
  word-break: break-word;
`;

export const Subheading = styled.div`
  width: 100%;
  font-size: var(--size-text-subheading-key-numbers, 1.136rem);
  font-weight: 600;
  word-break: break-word;
  white-space: normal;
`;
