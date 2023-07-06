import PropTypes from "prop-types";
import UniqueIconComposer from "@/components/svg/UniqueIconComposer";
import { ScreenreaderText } from "@rubin-epo/epo-react-lib";
import * as Styled from "./styles";

const DirectionalArrow = ({ angle, altText, className }) => {
  return (
    <Styled.Container
      className={className}
      style={{ "--angle": `${angle}deg` }}
    >
      <UniqueIconComposer icon="arrow" size="60%" />
      {altText && <ScreenreaderText>{altText}</ScreenreaderText>}
    </Styled.Container>
  );
};

DirectionalArrow.displayName = "Atomic.DirectionalArrow";

DirectionalArrow.propTypes = {
  angle: PropTypes.number.isRequired,
  altText: PropTypes.string,
  className: PropTypes.string,
};

export default DirectionalArrow;
