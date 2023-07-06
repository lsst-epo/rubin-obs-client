import styled from "styled-components";

export const Container = styled.div`
  background-color: var(--black, #000);
  border-radius: 50%;
  color: #30e0e3;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(var(--angle, 0deg));
  aspect-ratio: 1;
  width: 22px;
`;
