import { FunctionComponent } from "react";

const GalleryImage: FunctionComponent<WithSearchParams<GalleryImageProps>> = ({
  params: { locale, gallery, image },
  searchParams = {},
}) => {
  return (
    <div>
      <h1>Image {image}</h1>
    </div>
  );
};

export default GalleryImage;
