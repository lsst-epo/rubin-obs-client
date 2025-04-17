export const isDarkMode = (backgroundColor?: string | null) => {
  return !!backgroundColor?.includes("invert");
};
