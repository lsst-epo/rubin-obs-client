import styled from "styled-components";
import BaseLink from "next/link";
import CommonJsBreadcrumbs from "@castiron/components-breadcrumbs";
import { containerRegular, respond, tokens } from "@/styles/globalStyles";

// eslint-disable-next-line react/prop-types
const BreadcrumbsWrapper = ({ className, ...restProps }) => {
  const classes = {
    ol: `${className}__ol`,
    li: `${className}__li`,
  };

  return (
    <CommonJsBreadcrumbs
      className={className}
      classes={classes}
      {...restProps}
    />
  );
};

export const Breadcrumbs = styled(BreadcrumbsWrapper)`
  padding-top: 1.531em;
  padding-bottom: 1.531em;
  font-size: 16px;
  font-weight: 700;
  background-color: var(--neutral10);

  ${respond(`display: none;`, tokens.BREAK_PHABLET)}

  &__ol {
    display: flex;
    flex-wrap: wrap;

    ${({ $type }) =>
      $type === "search"
        ? `
        li {
          &:first-child {
            margin-left: 0;
            a {
              padding-left: 0;
            }
          }
        }
      `
        : containerRegular()}
  }

  &__li {
    &:first-child {
      margin-left: -1em;
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
  }
`;

export const Link = styled(BaseLink)`
  display: block;
  padding-right: 1em;
  padding-left: 1em;
  color: var(--turquoise85);

  &[aria-current="page"] {
    color: #3f3f3f;
  }

  &:hover {
    font-weight: bold;
    color: #062e2c;
  }
`;
