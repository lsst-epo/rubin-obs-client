import PropTypes from "prop-types";
import Link from "next/link";
import ExternalLink from "@/atomic/ExternalLink";
import { mixedLinkInternalShape } from "@/shapes/link";
import { normalizePathData } from "@/lib/utils";

export default function MixedLink({
  children,
  className,
  customText,
  element,
  params,
  text,
  target,
  url,
  tabIndex = 0,
}) {
  // make sure we're not working with a rubin url -- TODO: expand this with the production domain when ready
  url = url?.replace(/((https:\/\/|http:\/\/)(\w|\.|-)*rubin(\.\w+)*\/)/, "");

  if (url?.startsWith("http") || url?.startsWith("//")) {
    return (
      <ExternalLink
        href={url}
        className={className}
        target={target}
        tabIndex={tabIndex}
      >
        {!children && (customText ?? text)}
        {children}
      </ExternalLink>
    );
  } else {
    const pathnameInput = element?.uri || url || "/";
    const { pathname, pathParams } = normalizePathData(pathnameInput);

    const href = {
      pathname: pathname,
      query: { ...pathParams, ...params },
    };

    return (
      <Link href={href}>
        <a className={className} target={target} tabIndex={tabIndex}>
          {!children && (customText ?? text)}
          {children}
        </a>
      </Link>
    );
  }
}

MixedLink.displayName = "Primitives.MixedLink";

MixedLink.propTypes = {
  ...mixedLinkInternalShape,
  className: PropTypes.string,
};
