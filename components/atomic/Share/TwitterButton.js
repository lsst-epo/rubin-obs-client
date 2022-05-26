import { TwitterShareButton } from "react-share";
import { useTranslation } from "react-i18next";
import BaseButton from "./BaseButton";
import buttonShape from "./buttonShape";

function TwitterButton({ url, title }) {
  const { t } = useTranslation();

  return (
    <TwitterShareButton
      url={url}
      title={t("share.twitter_title", { title })}
      hashtags={["RubinObs"]}
    >
      <BaseButton
        label="Facebook"
        icon="shareTwitter"
        iconSize={44}
        bgColor="#38a8e0"
        bgHoverColor="#98d0f1"
      />
    </TwitterShareButton>
  );
}

TwitterButton.displayName = "Share.TwitterButton";

TwitterButton.propTypes = buttonShape;

export default TwitterButton;
