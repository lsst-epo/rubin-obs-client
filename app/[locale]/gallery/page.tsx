import { FunctionComponent } from "react";

const GalleryLanding: FunctionComponent<WithSearchParams<LocaleProps>> = ({
  params: { locale },
  searchParams = {},
}) => {
  return (
    <div>
      <h1>Gallery Landing</h1>
    </div>
  );
};

export default GalleryLanding;
