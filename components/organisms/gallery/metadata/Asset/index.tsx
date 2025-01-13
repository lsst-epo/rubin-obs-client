import { FunctionComponent } from "react";
import convert from "convert";
import { getLocale } from "@/lib/i18n/server";
import { useTranslation } from "@/lib/i18n";
import { CantoAssetScheme } from "@/lib/api/galleries/schema";
import MetadataList, {
  MetadataItem,
} from "@/components/molecules/MetadataList";
import MetadataSection from "../Section";

interface AssetMetadataProps {
  scheme: CantoAssetScheme;
  width: string | number;
  height: string | number;
  dateCreated: Date;
  size: number;
}

const AssetMetadata: FunctionComponent<AssetMetadataProps> = async ({
  width,
  height,
  size,
  scheme,
  dateCreated,
}) => {
  const locale = getLocale();
  const { t } = await useTranslation(locale);
  const { quantity, unit } = convert(size, "bytes").to("best");

  const items: Array<MetadataItem> = [
    {
      key: t("gallery.date-created"),
      value: (
        <time dateTime={dateCreated.toISOString()}>
          {new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(
            dateCreated
          )}
        </time>
      ),
    },
    { key: t("gallery.size"), value: `${width} × ${height} px` },
    {
      key: t("gallery.file-size"),
      value: `${new Intl.NumberFormat(locale, {
        maximumFractionDigits: 2,
      }).format(quantity)}${unit}`,
    },
  ];

  return (
    <MetadataSection
      title={t(`gallery.about-the-${scheme}`)}
      metadata={<MetadataList items={items} />}
    />
  );
};

AssetMetadata.displayName = "Organism.Gallery.Metadata.Asset";

export default AssetMetadata;
