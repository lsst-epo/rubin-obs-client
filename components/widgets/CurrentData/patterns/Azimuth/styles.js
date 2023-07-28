import styled from "styled-components";
export * from "../../styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  align-items: center;
  height: 100%;
`;

export const Compass = styled.svg`
  flex-grow: 1;
  width: 100%;
  aspect-ratio: 1;
  overflow-clip-margin: 1px;
`;
