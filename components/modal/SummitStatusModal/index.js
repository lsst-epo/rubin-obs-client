import PropTypes from "prop-types";
import * as Styled from "./styles";
import UnitLocalization from "@/components/layout/UnitLocalization";

const SummitStatusModal = ({ open, onClose, children }) => {
  return (
    <Styled.Dialog {...{ open, onClose }}>
      <Styled.Overlay />
      <Styled.Content aria-live="polite">
        <Styled.Toolbar>
          <UnitLocalization />
          <Styled.CloseButton
            type="button"
            aria-label="Close"
            onClickCallback={() => onClose && onClose()}
            icon="close"
          />
        </Styled.Toolbar>

        {children}
      </Styled.Content>
    </Styled.Dialog>
  );
};

SummitStatusModal.displayName = "Modal.SummitStatus";

SummitStatusModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default SummitStatusModal;
