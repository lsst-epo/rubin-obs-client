"use client";
import { FC, useState } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { usePopper } from "react-popper";
import { useTranslation } from "react-i18next";
import IconComposer from "@rubin-epo/epo-react-lib/IconComposer";
import { env } from "@/env";
import { isAbsoluteUrl } from "@/helpers";
import ShareButtons from "@/atomic/Share";
import styles from "./styles.module.css";

const BASE_URL = env.NEXT_PUBLIC_BASE_URL;

function createFinalUrl(url: string) {
  if (isAbsoluteUrl(url)) return url;

  const urlObj = new URL(url, BASE_URL);
  return urlObj.toString();
}

interface SharePopupProps {
  title: string;
  url: string;
  className?: string;
}

const SharePopup: FC<SharePopupProps> = ({ title, url, className }) => {
  const { t } = useTranslation();
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
    {
      modifiers: [{ name: "offset", options: { offset: [0, 10] } }],
    }
  );

  return (
    <Popover className={className}>
      <PopoverButton ref={setReferenceElement} className={styles.button}>
        <IconComposer size="0.75em" icon="shareToggle" />
        <span className="a-hidden">{t("share.label_item", { title })}</span>
      </PopoverButton>
      <PopoverPanel
        ref={setPopperElement}
        style={popperStyles.popper}
        {...attributes.popper}
        className={styles.panel}
      >
        <ShareButtons title={title} url={createFinalUrl(url)} />
      </PopoverPanel>
    </Popover>
  );
};

SharePopup.displayName = "Layout.SharePopup";

export default SharePopup;
