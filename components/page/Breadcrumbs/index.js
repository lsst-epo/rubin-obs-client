import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
import internalLinkShape from "@/shapes/link";
import { containerRegular, respond } from "@/styles/globalStyles";

export default function Breadcrumbs({ breadcrumbs, type }) {
  if (!breadcrumbs || breadcrumbs.length < 1) return null;

  return type === "search" ? (
    <SearchNav>
      <SearchList>
        {breadcrumbs.map((breadcrumb) => (
          <Item key={breadcrumb.id} active={breadcrumb.active}>
            <Link href={`/${breadcrumb.uri}`}>
              <a>{breadcrumb.title}</a>
            </Link>
          </Item>
        ))}
      </SearchList>
    </SearchNav>
  ) : (
    <Nav>
      <List>
        {breadcrumbs.map((breadcrumb) => (
          <Item key={breadcrumb.id} active={breadcrumb.active}>
            <Link href={`/${breadcrumb.uri}`}>
              <a>{breadcrumb.title}</a>
            </Link>
          </Item>
        ))}
      </List>
    </Nav>
  );
}

const SearchNav = styled.nav`
  font-size: 16px;
  font-weight: 700;
`;

const SearchList = styled.ul`
  display: flex;
  li {
    &:first-child {
      margin-left: 0;
      a {
        padding-left: 0;
      }
    }
  }
`;

const Nav = styled.nav`
  padding-top: 1.531em;
  padding-bottom: 1.531em;
  font-size: 16px;
  font-weight: 700;
  background-color: var(--neutral10);

  ${respond(`display: none;`, "450px")}
`;

const List = styled.ul`
  ${containerRegular()}
  display: flex;
`;

const Item = styled.li`
  &:first-child {
    margin-left: -1 * 1em;
  }

  & + & {
    position: relative;

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      content: "|";
      transform: translateX(-50%);
    }
  }

  a {
    display: block;
    padding-right: 1em;
    padding-left: 1em;
    text-decoration: none;
    ${(p) => p.active && `color: var(--turquoise55)`}
  }
`;
Breadcrumbs.displayName = "Global.Breadcrumbs";

Breadcrumbs.propTypes = {
  breadcrumbs: PropTypes.arrayOf(internalLinkShape),
  type: PropTypes.string,
};
