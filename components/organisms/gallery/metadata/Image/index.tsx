import { FunctionComponent } from "react";
import MetadataList, {
  MetadataItem,
} from "@/components/molecules/MetadataList";
import MetadataSection from "../Section";

interface ImageMetadataProps {
  width: string | number;
  height: string | number;
}

const ImageMetadata: FunctionComponent<ImageMetadataProps> = ({
  width,
  height,
}) => {
  const items: Array<MetadataItem> = [
    { key: "Size", value: `${width} × ${height} px` },
  ];

  return (
    <MetadataSection
      title="About the image"
      metadata={<MetadataList items={items} />}
    />
  );
};

ImageMetadata.displayName = "Organism.Gallery.Metadata.Image";

export default ImageMetadata;
