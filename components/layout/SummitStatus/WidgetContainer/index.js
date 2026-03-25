import * as Styled from "./styles";
import Link from "next/link";
import PropTypes from "prop-types";
import LocaleContextInfoBar from "@/components/molecules/LocaleContextInfoBar";
import { useSummitData } from "@/contexts/SummitData";
import { useTranslation } from "react-i18next";

const WidgetContainer = ({ dashboardCaption, children }) => {
  const { t } = useTranslation();
  const {
    localeContextInfo: { time, date, location },
  } = useSummitData();

  const { url, customText } = dashboardCaption;

  return (
    <Styled.Wrapper>
      <LocaleContextInfoBar time={time} date={date} location={location} />
      <Styled.WidgetContainer>
        <Styled.HeaderText>{t("summit_dashboard.title")}</Styled.HeaderText>
        {children}
        {url && (
          <Styled.FooterText>
            <Link href={url}>{customText}</Link>{" "}
          </Styled.FooterText>
        )}
      </Styled.WidgetContainer>
    </Styled.Wrapper>
  );
};
WidgetContainer.displayName = "Layout.WidgetContainer";

WidgetContainer.propTypes = {
  dashboardCaption: PropTypes.linkField_Link,
  children: PropTypes.node,
};
export default WidgetContainer;
