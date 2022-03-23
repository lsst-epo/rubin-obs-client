import PropTypes from "prop-types";
import * as Styled from "./styles";

export default function SubHero({ header, text, type = "studentPages" }) {
  return text || header ? (
    <Styled.Wrapper
      $bgColor={type === "studentPages" ? "turquoise05" : "orange20"}
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
  type: PropTypes.oneOf(["studentPages", "educatorPages"]),
};
