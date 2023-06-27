import styled from "styled-components";
export * from "../../styles";

export const Speed = styled.span`
  white-space: nowrap;
`;

export const Direction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  color: #30e0e3;
  background-color: var(--black, #000);
  border-radius: 50%;
  transform: rotate(var(--angle, 0deg));
`;

export const NoData = styled.span`
  font-size: 0.5em;
  color: var(--white, #fff);
`;
