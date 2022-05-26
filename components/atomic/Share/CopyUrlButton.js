import { useTranslation } from "react-i18next";
import BaseButton from "./BaseButton";
import buttonShape from "./buttonShape";

function CopyUrlButton({ url }) {
  const { t } = useTranslation();

  function onClick() {
    if (!navigator.clipboard) return;

    navigator.clipboard.writeText(url).then(
      function () {
        /* clipboard successfully set */
      },
      function (error) {
        /* clipboard write failed */
        console.error(error);
      }
    );
  }

  return (
    <button onClick={onClick}>
      <BaseButton
        label={t("share.copy_url")}
        icon="shareCopyUrl"
        iconSize={20}
        bgColor="var(--turquoise70)"
        bgHoverColor="#7ac1c2"
      />
    </button>
  );
}

CopyUrlButton.displayName = "Share.CopyUrlButton";

CopyUrlButton.propTypes = buttonShape;

export default CopyUrlButton;
