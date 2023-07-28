import PropTypes from "prop-types";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import WidgetSection from "@/components/layout/WidgetSection";
import * as Styled from "./styles";

const Instruments = ({ azimuth, zenith }) => {
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(true);

  const sectionProps = {
    title: t("summit_dashboard.sections.observations.instruments"),
    onToggleCallback: (value) => setOpen(value),
    isOpen,
  };

  return (
    <WidgetSection {...sectionProps}>
      <Styled.InstrumentsLayout $variant="secondary">
        <Styled.BigAzimuth azimuth={azimuth} />
        <Styled.BigZenith zenith={zenith} />
      </Styled.InstrumentsLayout>
    </WidgetSection>
  );
};

Instruments.propTypes = {
  azimuth: PropTypes.number,
  zenith: PropTypes.number,
};

Instruments.displayName = "Dynamic.Observation.Insturments";

export default Instruments;
