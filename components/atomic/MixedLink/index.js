import PropTypes from "prop-types";
import Link from "next/link";
import ExternalLink from "@/atomic/ExternalLink";
import { mixedLinkInternalShape } from "@/shapes/link";
import { normalizePathData } from "@/lib/utils";
import { isInternalUrl, isAbsoluteUrl } from "@/helpers";

function getPathnameInput({ element, url }) {
  if (element?.uri) return element.uri;
  if (!url) return "/";
  if (isAbsoluteUrl(url)) return new URL(url).pathname;
  return url;
}

export default function MixedLink({
  children,
  className,
  customText,
  element,
  params,
  hash,
  text,
  url,
  type: typeIgnored,
  shallow = false,
  ...restProps
}) {
  if (!isInternalUrl(url)) {
    return (
      <ExternalLink href={url} className={className} {...restProps}>
        {!children && (customText ?? text)}
        {children}
      </ExternalLink>
    );
  } else {
    const pathnameInput = getPathnameInput({ element, url });
    const { pathname, pathParams } = normalizePathData(pathnameInput);

    const href = {
      pathname,
      query: { ...pathParams, ...params },
      hash,
    };

    return (
      <Link href={href} passHref shallow={shallow}>
        <a className={className} {...restProps}>
          {!children && (customText ?? text)}
          {children}
        </a>
      </Link>
    );
  }
}

MixedLink.displayName = "Atomic.MixedLink";

MixedLink.propTypes = {
  ...mixedLinkInternalShape,
  className: PropTypes.string,
};
