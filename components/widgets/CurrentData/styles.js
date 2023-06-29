import styled from "styled-components";

export const Value = styled.span`
  --font-size: ${({ $variant }) => ($variant === "large" ? "450%" : "275%")};

  display: inline-flex;
  align-items: center;
  font-size: var(--font-size);
  font-variant-numeric: tabular-nums;
  line-height: 1;
`;

export const Separator = styled.hr`
  margin: 0;
  padding: 0;
  width: 100%;
`;

export const Unit = styled.span`
  text-align: center;
`;

export const Label = styled.h3`
  font-size: 1em;
  font-weight: normal;
  text-align: center;
`;
