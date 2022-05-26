import { useTranslation } from "react-i18next";
import { useGlobalData } from "@/lib/utils";
import CopyUrlButton from "./CopyUrlButton";
import FacebookButton from "./FacebookButton";
import TwitterButton from "./TwitterButton";
import EmailButton from "./EmailButton";
import * as Styled from "./styles";

// const FALLBACK_URL = process.env.NEXT_PUBLIC_BASE_URL;
// Should be replaced with an env var
const FALLBACK_URL = "https://dev.rubinobs.com";

function Share() {
  const { t } = useTranslation();
  const {
    siteInfo: { siteTitle },
  } = useGlobalData();
  const buttonProps = {
    url: typeof window !== "undefined" ? window.location.href : FALLBACK_URL,
    title: typeof window !== "undefined" ? document.title : siteTitle,
  };

  return (
    <Styled.Ul aria-label={t("share.label")}>
      <li>
        <CopyUrlButton {...buttonProps} />
      </li>
      <li>
        <FacebookButton {...buttonProps} />
      </li>
      <li>
        <TwitterButton {...buttonProps} />
      </li>
      <li>
        <EmailButton {...buttonProps} />
      </li>
      {/* <li>RSS</li> */}
    </Styled.Ul>
  );
}

Share.displayName = "Atomic.Share";

export default Share;
