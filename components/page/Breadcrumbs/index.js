import PropTypes from "prop-types";
import Link from "next/link";
import internalLinkShape from "@/shapes/link";
import * as Styled from "./styles";

export default function Breadcrumbs({ breadcrumbs, type }) {
  if (!breadcrumbs || breadcrumbs.length < 1) return null;

  return (
    <Styled.Breadcrumbs breadcrumbs={breadcrumbs} $type={type}>
      {({ id, uri, title, ...restProps }) => (
        <Link href={`/${uri}`} passHref>
          <Styled.Link {...restProps}>{title}</Styled.Link>
        </Link>
      )}
    </Styled.Breadcrumbs>
  );
}

Breadcrumbs.displayName = "Global.Breadcrumbs";

Breadcrumbs.propTypes = {
  breadcrumbs: PropTypes.arrayOf(internalLinkShape),
  type: PropTypes.string,
};
