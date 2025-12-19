import * as Styled from "./styles";
import UniqueIconComposer from "@/components/svg/UniqueIconComposer";
import PropTypes from "prop-types";

const InfoIcon = ({ size, height, width }) => {
  return (
    <Styled.InfoIcon>
      <UniqueIconComposer
        icon="info"
        size={size}
        height={height}
        width={width}
      />
    </Styled.InfoIcon>
  );
};

InfoIcon.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.number,
  height: PropTypes.number,
};

export default InfoIcon;
