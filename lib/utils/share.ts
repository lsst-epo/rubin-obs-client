export const shouldShare = () => {
  if (typeof window === "undefined") return false;
  if (typeof navigator.share === "undefined") return false;

  return navigator.userAgent.includes("Mobi");
};
