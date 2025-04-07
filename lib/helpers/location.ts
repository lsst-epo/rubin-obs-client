export const createLocationString = (
  city: string,
  state: string,
  country: string,
  address = "",
  isFull = false
) => {
  // logic for displaying city/state in US, city/country outside
  let start: string = "";
  let end: string;

  if (isFull) {
    start = address ? address + ", " : "";
    end = state ? state + ", " + country : country;
  } else {
    end = country === "USA" || country === "United States" ? state : country;
  }

  const loc = `${start}${city ? city + ", " : ""}${end || ""}`;
  return loc;
};
