import { FunctionComponent } from "react";
import { getGalleryData } from "@/lib/api/galleries";

// should retrieve all galleries by entry, and
// return an array of their slugs to statically
// generate their content
// export async function generateStaticParams() {
// }

const Gallery: FunctionComponent<WithSearchParams<GalleryProps>> = async ({
  params: { locale, gallery },
  searchParams = {},
}) => {

  const data = await getGalleryData(
    gallery,
    searchParams
    // section,
    // type,
    // locale,
    // previewToken
  );

  return (
    <div>
      <h1>Gallery {gallery}</h1>
      <a href="?sort=asc">Sort Ascending</a><br></br>
      <a href="?sort=desc">Sort Descending</a>
      <p>searchParams: {JSON.stringify(searchParams)}</p>
      <pre>Data : {JSON.stringify(data, null, 2)} </pre>
    </div>
  );
};

export default Gallery;
