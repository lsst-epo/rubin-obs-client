import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Initializing i18n so components calling useTranslation() don't warn about a missing i18next instance.
i18n.use(initReactI18next).init({
  lng: "en",
  resources: {},
  initImmediate: false,
  react: { useSuspense: false },
});

afterEach(() => {
  cleanup();
});
