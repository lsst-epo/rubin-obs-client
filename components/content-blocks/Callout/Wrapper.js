import PropTypes from "prop-types";
import { Section, Inner } from "./styles";

export default function CalloutWrapper({
  backgroundColor = "white",
  children,
  height,
  order = "text",
  overlay = false,
  ratio = "50",
  stack,
  width = "full",
  isImage,
}) {
  return (
    <Section $bgColor={backgroundColor} $width={width} $overlay={overlay}>
      <Inner
        $isImage={isImage}
        $order={order}
        $ratio={ratio}
        $height={height}
        $stack={stack}
      >
        {children}
      </Inner>
    </Section>
  );
}

CalloutWrapper.displayName = "ContentBlock.Callout.Wrapper";

CalloutWrapper.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.node.isRequired,
  height: PropTypes.string,
  order: PropTypes.string,
  overlay: PropTypes.bool,
  ratio: PropTypes.string,
  stack: PropTypes.string,
  width: PropTypes.string,
  isImage: PropTypes.bool,
};
