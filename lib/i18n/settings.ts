export const fallbackLng = "en";
export const languages = [fallbackLng, "es"] as const;
export const defaultNS = "translation";
export const namespaces = [defaultNS];
export const cookieName = "NEXT_LOCALE";
export type Locale = (typeof languages)[number];
