import { protoButton } from "@/styles/globalStyles";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
import { isInternalUrl } from "@/helpers";

export default function Buttonish({ isBlock = false, text, url }) {
  if (!isInternalUrl(url)) {
    return (
      <StyledButton href={url} $isBlock={isBlock}>
        {text}
      </StyledButton>
    );
  } else if (url) {
    return (
      <Link href={url} passHref>
        <StyledButton $isBlock={isBlock}>{text}</StyledButton>
      </Link>
    );
  } else {
    return null;
  }
}

const StyledButton = styled.a`
  ${protoButton()}
  padding: 1.188em 2.125em;
  font-size: 16px;
  font-weight: bold;
  color: var(--white);
  text-decoration: none;
  background-color: var(--turquoise60);
  border-radius: 0.375em;
  transition: background-color 0.2s;

  &:hover:not(:disabled),
  &:focus-visible {
    background-color: var(--turquoise80);
  }

  &:disabled {
    background-color: var(--neutral40);
  }

  ${(p) => p.$isBlock && `display: block; text-align: center;`}
`;

Buttonish.propTypes = {
  url: PropTypes.string,
  text: PropTypes.string.isRequired,
  isBlock: PropTypes.bool,
};
