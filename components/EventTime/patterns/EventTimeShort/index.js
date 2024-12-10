import PropTypes from "prop-types";
import { useGlobalData } from "@/lib/utils";
import { makeDateObject } from "@/helpers/dates";
import * as Styled from "./styles";
import { fallbackLng } from "@/lib/i18n/settings";

function renderShortDate({ month, day, year }) {
  return (
    <Styled.Date>
      <Styled.DateMonth>{month}</Styled.DateMonth>
      <Styled.DateDay>{day}</Styled.DateDay>
      <Styled.DateYear>{year}</Styled.DateYear>
    </Styled.Date>
  );
}

export default function EventTimeShort({ startDate, endDate, isSameDay }) {
  const localeInfo = useGlobalData("localeInfo");
  const locale = localeInfo?.language || fallbackLng;
  const endDateObject = makeDateObject(endDate, { locale, isShort: true });
  const startDateObject = !isSameDay
    ? makeDateObject(startDate, { locale, isShort: true })
    : null;

  return (
    <Styled.DateWrapper $hasStartDate={!isSameDay}>
      {!isSameDay && (
        <>
          {renderShortDate(startDateObject)}
          <Styled.DateEmDash>—</Styled.DateEmDash>
        </>
      )}
      {renderShortDate(endDateObject)}
    </Styled.DateWrapper>
  );
}

EventTimeShort.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  isSameDay: PropTypes.bool,
};
