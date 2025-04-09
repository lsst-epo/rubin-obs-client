"use client";
import { FC, MouseEventHandler, useState } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { usePathname } from "next/navigation";
import { usePopper } from "react-popper";
import { useTranslation } from "react-i18next";
import IconComposer from "@rubin-epo/epo-react-lib/IconComposer";
import Button from "@rubin-epo/epo-react-lib/Button";
import { env } from "@/env";
import { isAbsoluteUrl } from "@/helpers";
import ShareButtons from "@/components/molecules/Share";
import styles from "./styles.module.css";
import { shouldShare } from "@/lib/utils/share";

const BASE_URL = env.NEXT_PUBLIC_BASE_URL;

function createFinalUrl(url?: string) {
  if (!url) return;
  if (isAbsoluteUrl(url)) return url;

  const urlObj = new URL(url, BASE_URL);
  return urlObj.toString();
}

interface SharePopupProps {
  variant?: "primary" | "block";
  title?: string;
  url?: string;
  className?: string;
}

const SharePopup: FC<SharePopupProps> = ({
  variant,
  title,
  url,
  className,
}) => {
  const pathname = usePathname();
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

  const finalUrl = createFinalUrl(url || pathname || undefined);

  const handleClick: MouseEventHandler = async (event) => {
    if (shouldShare()) {
      event.preventDefault();

      const data: ShareData = { title, url: finalUrl };

      try {
        navigator.share(data);
      } catch (error) {
        console.warn(error);
      }
    }
  };

  const isBlock = variant === "block";

  const sharedProps = {
    ref: setReferenceElement,
    onClick: handleClick,
  };

  const RenderedPopoverButton = isBlock ? (
    <PopoverButton {...sharedProps} as={Button} isBlock>
      {t("share.label_item", { title })}
    </PopoverButton>
  ) : (
    <PopoverButton {...sharedProps} className={styles.button}>
      <IconComposer size="0.75em" icon="shareToggle" />
      <span className="a-hidden">{t("share.label_item", { title })}</span>
    </PopoverButton>
  );

  return (
    <Popover className={className}>
      {RenderedPopoverButton}
      <PopoverPanel
        ref={setPopperElement}
        style={popperStyles.popper}
        {...attributes.popper}
        className={styles.panel}
      >
        <ShareButtons title={title} url={finalUrl} />
      </PopoverPanel>
    </Popover>
  );
};

SharePopup.displayName = "Layout.SharePopup";

export default SharePopup;
