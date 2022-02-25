import styled from "styled-components";

export const Modal = styled.div`
  position: absolute;
  display: none;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);

  &[open] {
    display: flex;
  }
`;

export const Inner = styled.div`
  position: relative;
  background: var(--white);
  color: var(--neutral80);
  padding: 2rem;
`;

export const CloseButton = styled.button`
  background: #d1d1d1;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
`;
