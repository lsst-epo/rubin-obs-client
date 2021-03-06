import PropTypes from "prop-types";
import classNames from "classnames";
import { useNestedContext } from "@/contexts/Nested";
import * as Styled from "./styles";

export default function Container({
  bgColor = "white",
  children,
  className,
  width = "narrow",
  paddingSize = "large",
  elAttributes,
}) {
  const nested = useNestedContext();
  return (
    <Styled.Section
      className={classNames(className, {
        [`l-pad-top-${paddingSize}`]: !nested && paddingSize !== "none",
        [`l-pad-bottom-${paddingSize}`]: !nested && paddingSize !== "none",
      })}
      $bgColor={bgColor}
      {...elAttributes}
    >
      <Styled.Inner
        className={classNames({
          [`${className}__inner`]: !!className,
        })}
        $width={width}
        $nested={nested}
      >
        {children}
      </Styled.Inner>
    </Styled.Section>
  );
}

Container.displayName = "Layout.Container";

Container.propTypes = {
  bgColor: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  width: PropTypes.oneOf(["narrow", "regular", "wide"]),
  /** Applies padding utility class of the same name.
   * Default is "large", "none" removes the class entirely */
  paddingSize: PropTypes.oneOf(["large", "medium", "small", "none"]),
  elAttributes: PropTypes.shape({
    role: PropTypes.string,
    "aria-hidden": PropTypes.bool,
    "aria-labelledby": PropTypes.string,
    id: PropTypes.string,
  }),
};
