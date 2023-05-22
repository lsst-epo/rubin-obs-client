import PropTypes from "prop-types";

const SummitStatus = ({ summitStatusLayout }) => (
  <section>
    <h1>Summit Status!</h1>
    {summitStatusLayout}
  </section>
);

SummitStatus.propTypes = {
  summitStatusLayout: PropTypes.oneOf(["compact", "full"]),
};

export default SummitStatus;
