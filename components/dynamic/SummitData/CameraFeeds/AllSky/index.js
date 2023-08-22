import PropTypes from "prop-types";
import CurrentImage from "./CurrentImage";
import CurrentTimeLapse from "./CurrentTimeLapse";
import * as Styled from "./styles";

const CameraFeeds = ({ image, video }) => {
  return (
    <Styled.Container>
      <CurrentImage image={image} />
      <CurrentTimeLapse video={video} />
    </Styled.Container>
  );
};

CameraFeeds.propTypes = {
  image: PropTypes.object,
  video: PropTypes.object,
};

export default CameraFeeds;
