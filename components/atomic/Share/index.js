import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useGlobalData } from "@/lib/utils";
import {
  CopyUrlButton,
  FacebookButton,
  TwitterButton,
  EmailButton,
} from "@rubin-epo/epo-react-lib";
import * as Styled from "./styles";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function getShareUrl(url) {
  if (url) return url;
  return typeof window !== "undefined" ? window.location.href : BASE_URL;
}

function getShareTitle(title, siteTitle) {
  if (title) return title;
  return typeof window !== "undefined" ? document.title : siteTitle;
}

function Share({ title, url }) {
  const { t } = useTranslation();
  const {
    siteInfo: { siteTitle },
  } = useGlobalData();
  const buttonProps = {
    url: getShareUrl(url),
    title: getShareTitle(title, siteTitle),
  };

  return (
    <Styled.Ul aria-label={t("share.label_current")}>
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

Share.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
};

export default Share;
