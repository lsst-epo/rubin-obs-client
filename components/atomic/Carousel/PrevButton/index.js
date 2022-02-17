import { useTranslation } from "react-i18next";
import IconComposer from "@/components/svg/IconComposer";
import { useCarouselContext } from "../context";
import * as Styled from "./styles";

function PrevButton() {
  const { t } = useTranslation();
  const { prevButtonProps } = useCarouselContext();

  return (
    <Styled.Button {...prevButtonProps}>
      <span className="a-hidden">{t("pagination.previous")}</span>
      <IconComposer icon="caret" />
    </Styled.Button>
  );
}

PrevButton.displayName = "Carousel.PrevButton";

export default PrevButton;
