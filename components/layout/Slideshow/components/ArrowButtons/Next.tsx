"use client";

import { IconComposer } from "@rubin-epo/epo-react-lib";
import * as Styled from "./styles";
import { useTranslation } from "react-i18next";
import { useCarouselContext } from "../../context";

export default function Next() {
  const { t } = useTranslation();
  const { nextButtonProps } = useCarouselContext();

  return (
    <Styled.NextArrow {...nextButtonProps}>
      <span className="a-hidden">{t("pagination.next")}</span>
      <IconComposer icon="ChevronThin" />
    </Styled.NextArrow>
  );
}
