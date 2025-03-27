"use client";
import PropTypes from "prop-types";
import { useTimeString, useTimeZone } from "@/lib/utils";
import { makeDateString } from "@/helpers/dates";

export default function EventTimeLong({
  startDate,
  startTime,
  endDate,
  endTime,
  timezone,
  isSameDay,
}) {
  const localizedStartDate = makeDateString(startDate);
  const localizedStartTime = useTimeString(startTime);
  const localizedEndDate = makeDateString(endDate);
  const localizedEndTime = useTimeString(endTime);
  const localizedTimezone = useTimeZone(timezone);

  if (isSameDay) {
    return (
      <div>
        {localizedEndDate}
        {(startTime || endTime) && ` @ `}
        {startTime && localizedStartTime}
        {startTime && endTime && ` - `}
        {endTime && localizedEndTime}
        {(startTime || endTime) && ` (${localizedTimezone})`}
      </div>
    );
  }

  return (
    <div>
      {localizedStartDate}
      {startTime && ` @ ${localizedStartTime}`}
      {` - `}
      {localizedEndDate}
      {endTime && ` @ ${localizedEndTime}`}
      {(startTime || endTime) && ` (${localizedTimezone})`}
    </div>
  );
}

EventTimeLong.propTypes = {
  startDate: PropTypes.string,
  startTime: PropTypes.string,
  endDate: PropTypes.string,
  endTime: PropTypes.string,
  timezone: PropTypes.string,
  isSameDay: PropTypes.bool,
};
