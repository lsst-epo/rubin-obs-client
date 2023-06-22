import { useState } from "react";
import { useTranslation } from "react-i18next";
import WidgetPreview from "@/components/layout/WidgetPreview";
import SummitStatusModal from "@/components/modal/SummitStatusModal";

const Astroweather = () => {
  const { t } = useTranslation();
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <WidgetPreview
      {...previewProps}
      openModalCallback={() => {
        setModalOpen(true);
      }}
    >
      <SummitStatusModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
      ></SummitStatusModal>
    </WidgetPreview>
  );
};

Astroweather.displayName = "Dynamic.Astroweather";

export default Astroweather;
