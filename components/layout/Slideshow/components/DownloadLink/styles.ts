import styled from "styled-components";
import Link from "next/link";

export const DownloadLink = styled(Link)`
  display: flex;
  gap: 8px;
  align-items: center;
  color: inherit;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: hsla(181deg, 100%, 37%, 100%);
  }
`;
