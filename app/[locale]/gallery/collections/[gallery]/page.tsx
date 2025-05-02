import { FunctionComponent } from "react";
import { redirect } from "next/navigation";
import { getGalleryMetadata } from "@/lib/api/galleries";
import GalleryPage from "@/components/templates/GalleryPage";

const Gallery: FunctionComponent<WithSearchParams<GalleryProps>> = async ({
  params: { locale, gallery },
  searchParams = {},
}) => {
  const metadata = await getGalleryMetadata(gallery, locale);

  // while the main gallery is at a different route, it is still rendered through
  // this page. To avoid confusion and duplication, it's "true" path is redirected back to the main
  // gallery page. So that it doesn't get stuck in a loop, the main gallery page injects
  // a hidden query param that skips the redirect.
  if (metadata?.isMainGallery && searchParams?.renderedFrom !== "mainGallery") {
    redirect("/gallery");
  }

  return <GalleryPage {...{ locale, gallery, searchParams }} />;
};

export const dynamic = "force-dynamic";

export default Gallery;
