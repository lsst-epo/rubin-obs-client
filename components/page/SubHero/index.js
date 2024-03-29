import PropTypes from "prop-types";
import * as Styled from "./styles";

export default function SubHero({ header, text, type, colorScheme, nested }) {
  return text || header ? (
    <Styled.Wrapper
      $bgColor={
        colorScheme === "educator" || type === "educatorPages"
          ? "orange20"
          : "turquoise05"
      }
      $nested={nested}
      className="c-content-rte"
    >
      <h2>{header}</h2>
      <div dangerouslySetInnerHTML={{ __html: text }} />
    </Styled.Wrapper>
  ) : null;
}

SubHero.displayName = "Global.SubHero";

SubHero.propTypes = {
  text: PropTypes.string,
  header: PropTypes.string,
  type: PropTypes.oneOf([
    "pages",
    "studentPages",
    "educatorPages",
    "investigationLandingPage",
  ]),
  colorScheme: PropTypes.oneOf(["default", "student", "educator"]),
  nested: PropTypes.bool,
};
