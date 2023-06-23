import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import WidgetBackground from "@/components/atomic/WidgetBackground";
import * as Styled from "../../styles";
import Moon from "@/components/svg/unique/moon";

const MoonPhase = ({ phase = 0 }) => {
  const { t } = useTranslation();

  const labels = [
    t("summit_dashboard.astro.moon.new"),
    t("summit_dashboard.astro.moon.crescent", { context: "waxing" }),
    t("summit_dashboard.astro.moon.crescent", { context: "waxing" }),
    t("summit_dashboard.astro.moon.crescent", { context: "waxing" }),
    t("summit_dashboard.astro.moon.crescent", { context: "waxing" }),
    t("summit_dashboard.astro.moon.quarter", { context: "first" }),
    t("summit_dashboard.astro.moon.gibbous", { context: "waxing" }),
    t("summit_dashboard.astro.moon.gibbous", { context: "waxing" }),
    t("summit_dashboard.astro.moon.gibbous", { context: "waxing" }),
    t("summit_dashboard.astro.moon.gibbous", { context: "waxing" }),
    t("summit_dashboard.astro.moon.full"),
    t("summit_dashboard.astro.moon.gibbous", { context: "waning" }),
    t("summit_dashboard.astro.moon.gibbous", { context: "waning" }),
    t("summit_dashboard.astro.moon.gibbous", { context: "waning" }),
    t("summit_dashboard.astro.moon.gibbous", { context: "waning" }),
    t("summit_dashboard.astro.moon.quarter", { context: "last" }),
    t("summit_dashboard.astro.moon.crescent", { context: "waning" }),
    t("summit_dashboard.astro.moon.crescent", { context: "waning" }),
    t("summit_dashboard.astro.moon.crescent", { context: "waning" }),
    t("summit_dashboard.astro.moon.crescent", { context: "waning" }),
  ];

  const label =
    labels[Math.min(Math.floor(phase * labels.length), labels.length - 1)];

  return (
    <WidgetBackground $variant="secondary">
      <Styled.Label>{t("summit_dashboard.widgets.current.moon")}</Styled.Label>
      <Moon phase={phase} size={70} />
      <Styled.Unit>{label}</Styled.Unit>
    </WidgetBackground>
  );
};

MoonPhase.displayName = "Widgets.Current.MoonPhase";

MoonPhase.propTypes = {
  phase: PropTypes.number,
};

export default MoonPhase;
