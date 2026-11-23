export const isDarkMode = (backgroundColor?: string | null) => {
  return (
    !!backgroundColor?.includes("invert") ||
    !!backgroundColor?.includes("black")
  );
};
