import { FunctionComponent } from "react";
import convert from "convert";
import { getLocale } from "@/lib/i18n/server";
import { useTranslation } from "@/lib/i18n";
import MetadataList, {
  MetadataItem,
} from "@/components/molecules/MetadataList";
import MetadataSection from "../Section";
import formatDuration from "@/lib/utils/duration";

interface DocumentMetadataProps {
  scheme: "document";
  dateCreated: Date;
}

interface ImageMetadataProps {
  scheme: "image";
  dateCreated: Date;
  width: string | number;
  height: string | number;
  size?: number;
}

interface VideoMetadataProps {
  scheme: "video";
  dateCreated: Date;
  width: string | number;
  height: string | number;
  size?: number;
  duration?: number;
}

const AssetMetadata: FunctionComponent<
  DocumentMetadataProps | ImageMetadataProps | VideoMetadataProps
> = async (props) => {
  const locale = getLocale();
  const { t } = await useTranslation(locale);

  const items: Array<MetadataItem> = [];

  items.push({
    key:
      props.scheme === "document"
        ? t("gallery.date-published")
        : t("gallery.date-created"),
    value: (
      <time dateTime={props.dateCreated.toISOString()}>
        {new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(
          props.dateCreated
        )}
      </time>
    ),
  });

  if (props.scheme === "video" || props.scheme === "image") {
    items.push({
      key: t("gallery.size"),
      value: `${props.width} × ${props.height} px`,
    });

    if (props.size) {
      const { quantity, unit } = convert(props.size, "bytes").to("best");
      items.push({
        key: t("gallery.file-size"),
        value: `${new Intl.NumberFormat(locale, {
          maximumFractionDigits: 2,
        }).format(quantity)}${unit}`,
      });
    }
  }

  if (props.scheme === "video") {
    if (props.duration) {
      items.push({ key: "Duration", value: formatDuration(props.duration) });
    }
  }

  return (
    <MetadataSection
      title={t(`gallery.about-the-${props.scheme}`)}
      metadata={<MetadataList items={items} />}
    />
  );
};

AssetMetadata.displayName = "Organism.Gallery.Metadata.Asset";

export default AssetMetadata;
