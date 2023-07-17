import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  aspect-ratio: 1;
  color: #30e0e3;
  background-color: var(--black, #000);
  border-radius: 50%;
  transform: rotate(var(--angle, 0deg));
`;
