import * as Styled from "./styles";
import PropTypes from "prop-types";
import LocaleContextInfoBar from "@/components/molecules/LocaleContextInfoBar";
import { useSummitData } from "@/contexts/SummitData";
import { useTranslation } from "react-i18next";

const WidgetContainer = ({ dashboardCaption, children }) => {
  const { t } = useTranslation();
  const {
    localeContextInfo: { time, date, location },
  } = useSummitData();

  return (
    <Styled.Wrapper>
      <LocaleContextInfoBar time={time} date={date} location={location} />
      <Styled.WidgetContainer>
        <Styled.HeaderText>{t("summit_dashboard.title")}</Styled.HeaderText>
        {children}
        <Styled.FooterText>{dashboardCaption}</Styled.FooterText>
      </Styled.WidgetContainer>
    </Styled.Wrapper>
  );
};
WidgetContainer.displayName = "Layout.WidgetContainer";

WidgetContainer.propTypes = {
  dashboardCaption: PropTypes.string,
  children: PropTypes.node,
};
export default WidgetContainer;
