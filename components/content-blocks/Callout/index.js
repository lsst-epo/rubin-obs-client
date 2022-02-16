import PropTypes from "prop-types";
import CalloutTwoTone from "./CalloutTwoTone";
import CalloutMain from "./CalloutMain";

export default function CalloutContentBlock({ callout: calloutArray }) {
  if (!calloutArray?.length) return null;

  const callout = calloutArray[0];

  return callout.calloutType === "calloutTwoTone" ? (
    <CalloutTwoTone callout={callout} />
  ) : (
    <CalloutMain callout={callout} />
  );
}

CalloutContentBlock.displayName = "ContentBlock.Callout";

CalloutContentBlock.propTypes = {
  callout: PropTypes.array.isRequired,
};
