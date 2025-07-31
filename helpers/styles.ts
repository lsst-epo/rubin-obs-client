export const isDarkMode = (backgroundColor?: string | null) => {
  if (!backgroundColor) return false;

  return (
    !!backgroundColor.includes("invert") || !!backgroundColor.includes("black")
  );
};
