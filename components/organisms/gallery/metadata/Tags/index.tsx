import { FunctionComponent } from "react";
import MetadataSection from "../Section";
import TagList from "@/components/molecules/TagList";
import { getLocale } from "@/lib/i18n/server";
import { useTranslation } from "@/lib/i18n";

interface AssetTagsProps {
  tags: Array<string>;
  parentUri: string;
}

const AssetTags: FunctionComponent<AssetTagsProps> = async ({
  tags,
  parentUri,
}) => {
  const locale = getLocale();
  const { t } = await useTranslation(locale);
  if (tags.length === 0) return null;

  const tagsWithLinks = tags.map((tag) => {
    const searchParams = new URLSearchParams({ tag });
    return {
      name: tag,
      destination: `${parentUri}?${searchParams.toString()}`,
    };
  });

  return (
    <MetadataSection
      title={t("gallery.tags")}
      metadata={<TagList tags={tagsWithLinks} withLinebreaks />}
    />
  );
};

AssetTags.displayName = "Organism.Gallery.Metadata.AssetTags";

export default AssetTags;
