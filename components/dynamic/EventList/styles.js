import styled from "styled-components";

export const Sticker = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5em;

  > * + * {
    margin-left: 10px;
  }
`;
