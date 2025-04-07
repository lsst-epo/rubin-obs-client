export const checkIfBetweenDates = (startDate: Date, endDate: Date) => {
  if (!startDate || !endDate) {
    return true;
  }

  const currentDate = new Date();
  const from = new Date(startDate);
  const to = new Date(endDate);

  return currentDate > from && currentDate < to;
};
