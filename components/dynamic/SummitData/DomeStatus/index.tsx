import { useState } from "react";
import { useSummitData } from "@/contexts/SummitData";
import { useTranslation } from "react-i18next";
import Loader from "@/components/atomic/Loader";
import WidgetPreview from "@/components/layout/SummitStatus/WidgetPreview";
import WidgetSection from "@/components/layout/SummitStatus/WidgetSection";
import UniqueIconComposer from "@/components/svg/UniqueIconComposer";
import * as Styled from "./styles";

const DomeStatus = (isCompact) => {
  const { t } = useTranslation();
  const {
    summitData: { domeStatus },
    isLoading,
  } = useSummitData();
  console.info("domestatus: ", domeStatus);

  const [isModalOpen, setModalOpen] = useState(false);

  if (isLoading.hasura === undefined || isLoading.hasura) {
    return (
      <WidgetPreview
        title="Observation-related information"
        openModalCallback={() => {
          setModalOpen(true);
        }}
      >
        <Loader isVisible={true} />
      </WidgetPreview>
    );
  }

  if (isCompact && domeStatus !== undefined) {
    return (
      <WidgetSection
        isCollapsible={false}
        title={t("summit_dashboard.sections.dome_status.title")}
        caption={
          domeStatus
            ? t("summit_dashboard.sections.dome_status.status_open")
            : t("summit_dashboard.sections.dome_status.status_closed")
        }
      >
        <Styled.CondensedBackground $variant="secondary">
          {domeStatus ? (
            <UniqueIconComposer icon="openedDome" />
          ) : (
            <UniqueIconComposer icon="closedDome" />
          )}
        </Styled.CondensedBackground>
      </WidgetSection>
    );
  }
};

DomeStatus.displayName = "Dynamic.DomeStatus";

export default DomeStatus;
