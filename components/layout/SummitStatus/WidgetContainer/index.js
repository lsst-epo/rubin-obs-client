import * as Styled from "./styles";
import PropTypes from "prop-types";
import LocaleContextInfoBar from "@/components/molecules/LocaleContextInfoBar";
import { useSummitData } from "@/contexts/SummitData";

const WidgetContainer = ({ children }) => {
  const {
    localeContextInfo: { time, date, location },
  } = useSummitData();

  return (
    <Styled.Wrapper>
      <LocaleContextInfoBar time={time} date={date} location={location} />
      <Styled.WidgetContainer>
        <Styled.HeaderText>Rubin summit status dashboard</Styled.HeaderText>
        {children}
        <Styled.FooterText>See more summit status widgets!</Styled.FooterText>
      </Styled.WidgetContainer>
    </Styled.Wrapper>
  );
};
WidgetContainer.displayName = "Layout.WidgetContainer";

WidgetContainer.propTypes = {
  children: PropTypes.node,
};
export default WidgetContainer;
