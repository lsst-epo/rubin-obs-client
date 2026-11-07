"use client";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import * as Styled from "./styles";
import DownloadLink from "../DownloadLink";

interface Props {
  title?: string | null;
  description?: string | null;
  teaser?: string | null;
  inert?: boolean | null;
  imageUrl?: string | null;
  id: string;
  index: number;
}

export default function Description({
  title,
  description,
  teaser,
  inert,
  imageUrl,
  id,
  index,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <Styled.Description
      id={id}
      aria-live="polite"
      // React 18 drops boolean inert, so pass "" and hide it from the boolean prop type
      {...((inert ? { inert: "" } : {}) as object)}
    >
      {title ? (
        <Styled.Header>{title}</Styled.Header>
      ) : (
        <h3 className="a-hidden">
          {t("pagination.current-slide", { current: index + 1 })}
        </h3>
      )}
      {description && (
        <>
          {teaser && (
            <Styled.Teaser dangerouslySetInnerHTML={{ __html: teaser }} />
          )}
          {description && (
            <>
              <Styled.Body
                $hidden={!isOpen && !!teaser}
                dangerouslySetInnerHTML={{ __html: description }}
              />
              {teaser && (
                <Styled.ReadmoreWrapper>
                  <Styled.ReadmoreButton
                    type="button"
                    aria-pressed={isOpen}
                    onClick={() => setIsOpen((open) => !open)}
                  >
                    <span>{t("read-more")}</span>
                    <Styled.ReadmoreSvg icon="ChevronThin" />
                  </Styled.ReadmoreButton>
                  {imageUrl && <DownloadLink imageUrl={imageUrl} />}
                </Styled.ReadmoreWrapper>
              )}
            </>
          )}
        </>
      )}
    </Styled.Description>
  );
}
