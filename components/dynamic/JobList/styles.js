import styled from "styled-components";

export const Sticker = styled.div`
  display: flex;
  align-items: center;
  padding: 0.25em;

  > * + * {
    margin-left: 5px;
  }
`;

export const LocationWrapper = styled.div`
  display: flex;
  align-items: baseline;
`;
