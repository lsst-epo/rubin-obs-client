import { FunctionComponent } from "react";
import MetadataSection from "../Section";
import TagList from "@/components/molecules/TagList";

interface AssetTagsProps {
  tags: Array<string>;
  parentUri: string;
}

const AssetTags: FunctionComponent<AssetTagsProps> = ({ tags, parentUri }) => {
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
      title="Tags"
      metadata={<TagList tags={tagsWithLinks} withLinebreaks />}
    />
  );
};

AssetTags.displayName = "Organism.Gallery.Metadata.AssetTags";

export default AssetTags;
