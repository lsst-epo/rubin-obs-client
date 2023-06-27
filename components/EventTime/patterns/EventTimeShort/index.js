import PropTypes from "prop-types";
import { makeDateObject, useGlobalData } from "@/lib/utils";
import * as Styled from "./styles";

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
  const lang = localeInfo?.language || "en-US";
  const endDateObject = makeDateObject(endDate, lang, true);
  const startDateObject = !isSameDay
    ? makeDateObject(startDate, lang, true)
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
