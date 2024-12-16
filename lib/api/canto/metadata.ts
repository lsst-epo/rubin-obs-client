import { fallbackLng } from "@/lib/i18n/settings";
import { CantoDetailedAsset } from "types/canto";

export const assetCaption = (
  asset: CantoDetailedAsset,
  locale = fallbackLng
) => {
  const localeKey = locale.toUpperCase();

  return asset.additional[`Caption${localeKey}`];
};
