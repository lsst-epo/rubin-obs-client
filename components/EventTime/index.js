import PropTypes from "prop-types";
import EventTimeShort from "./patterns/EventTimeShort/index.js";
import EventTimeLong from "./patterns/EventTimeLong";

export default function EventTime({
  startDate,
  startTime,
  endDate,
  endTime,
  timezone,
  short = false,
}) {
  const isSameDay = endDate === startDate || (endDate && !startDate);

  if (short) return <EventTimeShort {...{ startDate, endDate, isSameDay }} />;

  return (
    <EventTimeLong
      {...{ startDate, endDate, startTime, endTime, timezone, isSameDay }}
    />
  );
}

EventTime.propTypes = {
  startDate: PropTypes.string,
  startTime: PropTypes.string,
  endDate: PropTypes.string,
  endTime: PropTypes.string,
  timezone: PropTypes.string,
  short: PropTypes.boolean,
};
