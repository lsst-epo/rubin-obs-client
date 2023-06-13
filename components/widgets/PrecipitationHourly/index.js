import PropTypes from "prop-types";
import ScrollableHorizontalWrapper from "@/components/atomic/ScrollableHorizontalWrapper";
import * as Styled from "./styles";

const PrecipitationHourly = ({ precipitationData = [] }) => {
  return (
    <Styled.PrecipitationHourlyBackground $variant="secondary">
      <Styled.PrecipitationHourlyTitle>
        Hourly precipitation probability report - Probability percentage
      </Styled.PrecipitationHourlyTitle>
      <ScrollableHorizontalWrapper></ScrollableHorizontalWrapper>
    </Styled.PrecipitationHourlyBackground>
  );
};

PrecipitationHourly.displayName = "Widgets.PrecipitationHourly";

PrecipitationHourly.propTypes = {
  precipitationData: PropTypes.arrayOf(
    PropTypes.shape({
      probability: PropTypes.number,
      time: PropTypes.number,
    })
  ).isRequired,
};

export default PrecipitationHourly;
