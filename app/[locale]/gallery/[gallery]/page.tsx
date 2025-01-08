import { FunctionComponent } from "react";
import Container from "@rubin-epo/epo-react-lib/Container";
import Stack from "@rubin-epo/epo-react-lib/Stack";
import PreviewGrid from "@/components/organisms/gallery/PreviewGrid";
import { getGalleryMetadata } from "@/lib/api/galleries";
import { notFound } from "next/navigation";
import { GalleryFilterSchema } from "@/lib/api/galleries/schema";

const Gallery: FunctionComponent<WithSearchParams<GalleryProps>> = async ({
  params: { locale, gallery },
  searchParams = {},
}) => {
  const metadata = await getGalleryMetadata(gallery, locale);

  if (!metadata) {
    notFound();
  }
  const { title } = metadata;

  const filters = GalleryFilterSchema.parse(searchParams);

  return (
    <Container width="wide">
      <Stack space="var(--size-spacing-s)">
        <h1>{title}</h1>
        <PreviewGrid {...{ locale, gallery, filters }} />
      </Stack>
    </Container>
  );
};

export default Gallery;
