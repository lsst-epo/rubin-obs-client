import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import * as Styled from "./styles";
import { IconComposer } from "@rubin-epo/epo-react-lib";

const WidgetPreview = ({
  title,
  callout,
  size = "medium",
  openModalCallback,
  children,
}) => {
  const { t } = useTranslation();
  return (
    <Styled.PreviewPanel $size={size}>
      <Styled.PreviewHeader>
        <Styled.PreviewTitle>{title}</Styled.PreviewTitle>
        {openModalCallback && (
          <Styled.IconButton
            aria-label={t("summit_dashboard.open_modal")}
            onClick={() => openModalCallback()}
          >
            <IconComposer icon="Plus" />
          </Styled.IconButton>
        )}
      </Styled.PreviewHeader>
      <Styled.PreviewContent $size={size}>{children}</Styled.PreviewContent>
      <Styled.PreviewCallout>{callout}</Styled.PreviewCallout>
    </Styled.PreviewPanel>
  );
};

WidgetPreview.displayName = "Layout.WidgetPreview";

WidgetPreview.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  callout: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large", "full"]),
  openModalCallback: PropTypes.func,
};

export default WidgetPreview;
