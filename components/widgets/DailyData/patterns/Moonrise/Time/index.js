import PropTypes from "prop-types";
import { formatAngle, formatTime } from "@/helpers/formatters";
import DirectionalArrow from "@/components/atomic/DirectionalArrow";
import * as Styled from "./styles";

const MoonTime = ({ time, azimuth }) => {
  return (
    <Styled.Container>
      <time dateTime={time.toISOString()}>{formatTime(time)}</time>
      <DirectionalArrow angle={azimuth} />({formatAngle(azimuth)})
    </Styled.Container>
  );
};

MoonTime.displayName = "Widgets.Daily.MoonTime";

MoonTime.propTypes = {
  time: PropTypes.instanceOf(Date),
  azimuth: PropTypes.number,
};

export default MoonTime;
