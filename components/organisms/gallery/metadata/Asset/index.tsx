import { FunctionComponent } from "react";
import convert from "convert";
import { getLocale } from "@/lib/i18n/server";
import { useTranslation } from "@/lib/i18n";
import {
  CantoAssetScheme,
  SupportedCantoAssetScheme,
} from "@/lib/api/galleries/schema";
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

const metadataMap: Record<SupportedCantoAssetScheme, Array<string>> = {
  image: ["dateCreated", "size", "fileSize"],
  video: ["dateCreated", "size", "fileSize"],
  document: ["datePublished"],
};

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

  const metadata: Record<string, MetadataItem> = {
    dateCreated: {
      key: t("gallery.date-created"),
      value: (
        <time dateTime={dateCreated.toISOString()}>
          {new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(
            dateCreated
          )}
        </time>
      ),
    },
    datePublished: {
      key: t("gallery.date-published"),
      value: (
        <time dateTime={dateCreated.toISOString()}>
          {new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(
            dateCreated
          )}
        </time>
      ),
    },
    size: { key: t("gallery.size"), value: `${width} × ${height} px` },
    fileSize: {
      key: t("gallery.file-size"),
      value: `${new Intl.NumberFormat(locale, {
        maximumFractionDigits: 2,
      }).format(quantity)}${unit}`,
    },
  };

  const items: Array<MetadataItem> = [];

  Object.entries(metadata).forEach(([key, value]) => {
    if (metadataMap[scheme].includes(key)) {
      items.push(value);
    }
  });

  return (
    <MetadataSection
      title={t(`gallery.about-the-${scheme}`)}
      metadata={<MetadataList items={items} />}
    />
  );
};

AssetMetadata.displayName = "Organism.Gallery.Metadata.Asset";

export default AssetMetadata;
