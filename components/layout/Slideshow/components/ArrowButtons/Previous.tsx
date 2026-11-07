"use client";

import { IconComposer } from "@rubin-epo/epo-react-lib";
import * as Styled from "./styles";
import { useTranslation } from "react-i18next";
import { useCarouselContext } from "../../context";

export default function Previous() {
  const { t } = useTranslation();
  const { prevButtonProps } = useCarouselContext();

  return (
    <Styled.ArrowButton {...prevButtonProps}>
      <span className="a-hidden">{t("pagination.previous")}</span>
      <IconComposer icon="ChevronThin" />
    </Styled.ArrowButton>
  );
}
