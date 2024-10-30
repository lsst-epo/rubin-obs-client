import { FunctionComponent } from "react";

// should retrieve all galleries by entry, and
// return an array of their slugs to statically
// generate their content
// export async function generateStaticParams() {
// }

const Gallery: FunctionComponent<WithSearchParams<GalleryProps>> = ({
  params: { locale, gallery },
  searchParams = {},
}) => {
  return (
    <div>
      <h1>Gallery {gallery}</h1>
    </div>
  );
};

export default Gallery;
