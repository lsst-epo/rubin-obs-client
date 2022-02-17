import { useTranslation } from "react-i18next";
import { useCarouselContext } from "../context";

function Status() {
  const { t } = useTranslation();
  const { active, length } = useCarouselContext();

  return (
    <div className="a-hidden" aria-live="polite">
      {t("pagination.showing-current-slide", { current: active + 1, length })}
    </div>
  );
}

Status.displayName = "Carousel.Status";

export default Status;
