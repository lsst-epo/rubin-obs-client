"use client";
import PropTypes from "prop-types";
import internalLinkShape from "@/shapes/link";
import * as Styled from "./styles";

export default function Breadcrumbs({ breadcrumbs, type }) {
  if (!breadcrumbs || breadcrumbs.length <= 1) return null;

  return (
    <Styled.Breadcrumbs breadcrumbs={breadcrumbs} $type={type}>
      {({ id, uri, title, ...restProps }) => {
        return (
          <Styled.Link prefetch={false} href={`/${uri}`} {...restProps}>
            {title}
          </Styled.Link>
        );
      }}
    </Styled.Breadcrumbs>
  );
}

Breadcrumbs.displayName = "Global.Breadcrumbs";

Breadcrumbs.propTypes = {
  breadcrumbs: PropTypes.arrayOf(internalLinkShape),
  type: PropTypes.string,
};
