import { FacebookShareButton } from "react-share";
import { useTranslation } from "react-i18next";
import BaseButton from "./BaseButton";
import buttonShape from "./buttonShape";

function FacebookButton({ url, title }) {
  const { t } = useTranslation();

  return (
    <FacebookShareButton
      url={url}
      quote={t("share.facebook_quote", { title })}
      hashtag="#RubinObs"
    >
      <BaseButton
        label="Facebook"
        icon="shareFacebook"
        iconSize={32}
        bgColor="#3d5a99"
        bgHoverColor="#98a5cb"
      />
    </FacebookShareButton>
  );
}

FacebookButton.displayName = "Share.FacebookButton";

FacebookButton.propTypes = buttonShape;

export default FacebookButton;
