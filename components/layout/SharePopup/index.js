"use client";
import { useState } from "react";
import PropTypes from "prop-types";
import { Popover } from "@headlessui/react";
import { usePopper } from "react-popper";
import { useTranslation } from "react-i18next";
import ShareButtons from "@/atomic/Share";
import { IconComposer } from "@rubin-epo/epo-react-lib";
import * as Styled from "./styles";
import { isAbsoluteUrl } from "@/helpers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function createFinalUrl(url) {
  if (isAbsoluteUrl(url)) return url;

  const urlObj = new URL(url, BASE_URL);
  return urlObj.toString();
}

function SharePopup({ title, url, className }) {
  const { t } = useTranslation();

  const [referenceElement, setReferenceElement] = useState();
  const [popperElement, setPopperElement] = useState();

  const { styles, attributes } = usePopper(referenceElement, popperElement);

  return (
    <Popover className={className}>
      <Styled.Button ref={setReferenceElement}>
        <IconComposer icon="shareToggle" />
        <span className="a-hidden">{t("share.label_item", { title })}</span>
      </Styled.Button>
      <Popover.Panel
        ref={setPopperElement}
        style={{ ...styles.popper, zIndex: 5 }}
        {...attributes.popper}
      >
        <Styled.PanelInner>
          <ShareButtons title={title} url={createFinalUrl(url)} />
        </Styled.PanelInner>
      </Popover.Panel>
    </Popover>
  );
}

SharePopup.displayName = "Layout.SharePopup";

SharePopup.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default SharePopup;
