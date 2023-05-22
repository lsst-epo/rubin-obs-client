import PropTypes from "prop-types";
import { Container } from "@rubin-epo/epo-react-lib";
import WidgetGrid from "@/components/layout/WidgetGrid";
import WidgetPreview from "@/components/layout/WidgetPreview";

const SummitStatus = ({ summitStatusLayout, widgetPreviews = [] }) => (
  <Container bgColor="neutral95" width="wide" paddingSize="small">
    <WidgetGrid>
      {widgetPreviews.map(({}, i) => (
        <WidgetPreview key={i}></WidgetPreview>
      ))}
    </WidgetGrid>
  </Container>
);

SummitStatus.propTypes = {
  summitStatusLayout: PropTypes.oneOf(["compact", "full"]),
  widgetPreviews: PropTypes.arrayOf({}),
};

SummitStatus.displayName = "ContentBlock.SummitStatus";

export default SummitStatus;
