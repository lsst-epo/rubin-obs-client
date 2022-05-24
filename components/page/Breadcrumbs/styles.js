import styled from "styled-components";
import CommonJsBreadcrumbs from "@castiron/components-breadcrumbs";
import { containerRegular, respond } from "@/styles/globalStyles";

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

  ${respond(`display: none;`, "450px")}

  &__ol {
    display: flex;

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

export const Link = styled.a`
  display: block;
  padding-right: 1em;
  padding-left: 1em;
  color: var(--turquoise55);

  &[aria-current="page"] {
    color: #3f3f3f;
  }

  &:hover {
    color: #062e2c;
    font-weight: bold;
  }
`;
