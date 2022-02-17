import { useTranslation } from "react-i18next";
import IconComposer from "@/components/svg/IconComposer";
import { useCarouselContext } from "../context";
import * as Styled from "./styles";

function NextButton() {
  const { t } = useTranslation();
  const { nextButtonProps } = useCarouselContext();

  return (
    <Styled.Button {...nextButtonProps}>
      <span className="a-hidden">{t("pagination.next")}</span>
      <IconComposer icon="caret" />
    </Styled.Button>
  );
}

NextButton.displayName = "Carousel.NextButton";

export default NextButton;
