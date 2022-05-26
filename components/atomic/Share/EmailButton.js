import { EmailShareButton } from "react-share";
import { useTranslation } from "react-i18next";
import BaseButton from "./BaseButton";
import buttonShape from "./buttonShape";

function EmailButton({ title, url }) {
  const { t } = useTranslation();

  return (
    <EmailShareButton
      url={url}
      subject={t("share.email_subject", {
        title,
      })}
      body={url}
    >
      <BaseButton
        label={t("share.email")}
        icon="shareEmail"
        iconSize={40}
        bgColor="var(--turquoise85)"
        bgHoverColor="#7fb3b1"
      />
    </EmailShareButton>
  );
}

EmailButton.displayName = "Share.EmailButton";

EmailButton.propTypes = buttonShape;

export default EmailButton;
