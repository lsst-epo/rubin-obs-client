import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { usePathname } from "next/navigation";

import Link from "next/link";
import { respond } from "@/styles/globalStyles";
import useQueryParams from "@/lib/routing/useQueryParams";
const NavButtons = ({
  hasDefault = true,
  linkLeft,
  linkRight,
  textLeft,
  textRight,
}) => {
  const pathname = usePathname();
  const { queryParams } = useQueryParams();
  const activeType = queryParams.get("type");

  return (
    <Nav>
      <Link
        legacyBehavior
        prefetch={false}
        href={{
          pathname,
          query: { ...queryParams, page: 1, type: linkLeft },
        }}
        passHref={true}
      >
        <NavButton
          $active={
            hasDefault ? activeType !== linkRight : activeType === linkLeft
          }
        >
          {textLeft}
        </NavButton>
      </Link>
      <Link
        legacyBehavior
        prefetch={false}
        href={{
          pathname,
          query: { ...queryParams, page: 1, type: linkRight },
        }}
        passHref={true}
      >
        <NavButton $active={activeType === linkRight}>{textRight}</NavButton>
      </Link>
    </Nav>
  );
};

const Nav = styled.nav`
  display: block;
  float: right;
  position: relative;
  top: -60px;
  > * {
    margin-left: 0.5em;
  }
  ${respond(`
    float: none;
    top: 40px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: center;
    grid-gap: 1em;
    > * {margin-left: 0;}`)}
`;

const NavButton = styled.a`
  display: inline-block;
  min-width: 250px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  padding: 1em 2em;
  background-color: var(--neutral10);
  ${(p) =>
    p.$active
      ? `background-color: var(--turquoise60); color: var(--white);`
      : `&:hover {
    background-color: var(--turquoise20);
  }`}
  ${respond(`
    display: flex;
    flex-direction: column;
    place-content: center;
    min-width: auto;
    padding: 0.5em;
    font-size: 24px;
  `)}
`;

NavButtons.propTypes = {
  hasDefault: PropTypes.bool,
  linkLeft: PropTypes.string,
  linkRight: PropTypes.string,
  textLeft: PropTypes.string,
  textRight: PropTypes.string,
};

export default NavButtons;
