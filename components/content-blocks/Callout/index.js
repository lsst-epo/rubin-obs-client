import PropTypes from "prop-types";
import CalloutTwoTone from "./CalloutTwoTone";
import CalloutMain from "./CalloutMain";
import CalloutQuote from "./CalloutQuote";
import CalloutEvent from "./CalloutEvent";
import CalloutNews from "./CalloutNews";

export default function CalloutContentBlock({ callout: calloutArray }) {
  if (!calloutArray?.length) return null;

  const callout = calloutArray[0];

  switch (callout.calloutType) {
    case "calloutTwoTone":
      return <CalloutTwoTone callout={callout} />;

    case "calloutQuote":
      return <CalloutQuote callout={callout} />;

    case "calloutNews":
      return <CalloutNews callout={callout} />;

    case "calloutEvent":
      return <CalloutEvent callout={callout} />;

    default:
      return <CalloutMain callout={callout} />;
  }
}

CalloutContentBlock.displayName = "ContentBlock.Callout";

CalloutContentBlock.propTypes = {
  callout: PropTypes.array.isRequired,
};
