import PropTypes from "prop-types";
import styled from "styled-components";
import classNames from "classnames";
import {
  containerNarrow,
  containerRegular,
  PADDING_LARGE,
  tokens,
} from "@/styles/globalStyles";

export default function Container({
  bgColor = "white",
  children,
  className,
  width = "narrow",
  elAttributes,
}) {
  return (
    <Section className={className} bgColor={bgColor} {...elAttributes}>
      <Inner
        className={classNames({
          [`${className}__inner`]: !!className,
        })}
        width={width}
      >
        {children}
      </Inner>
    </Section>
  );
}

const Section = styled.section`
  background-color: ${(p) => tokens[p.bgColor]};
  padding-top: ${PADDING_LARGE};
  padding-bottom: ${PADDING_LARGE};

  + section {
    padding-top: 0;
  }
`;

const Inner = styled.div`
  ${(p) => (p.width === "narrow" ? containerNarrow() : containerRegular())}
`;

Container.displayName = "Layout.Container";

Container.propTypes = {
  bgColor: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  width: PropTypes.string,
  elAttributes: PropTypes.shape({
    role: PropTypes.string,
    "aria-hidden": PropTypes.bool,
    "aria-labelledby": PropTypes.string,
    id: PropTypes.string,
  }),
};
