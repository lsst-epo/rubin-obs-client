import styled from "styled-components";
export * from "../../styles";

export const Speed = styled.span`
  white-space: nowrap;
`;

export const Direction = styled.div`
  background-color: var(--black, #000);
  border-radius: 50%;
  color: #30e0e3;
  width: 46px;
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(var(--angle, 0deg));
`;

export const NoData = styled.span`
  color: var(--white, #fff);
  font-size: 0.5em;
`;
