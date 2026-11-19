import { FragmentType, useFragment } from "@/gql";
import {
  SlideshowSlidesFragment,
  SlideshowSlidesFragmentDoc,
} from "@/gql/graphql";
import { SlideItem } from "./types";

type Asset = SlideshowSlidesFragment["coverImage"][number];

const toSlideImage = (asset: Asset): SlideItem["image"] => {
  if (!asset || !("url" in asset) || !asset.url) return undefined;

  return asset;
};

export default function useSlideshowSlides(
  slideshow: FragmentType<typeof SlideshowSlidesFragmentDoc>
) {
  const { id, title, description, coverImage, items } = useFragment(
    SlideshowSlidesFragmentDoc,
    slideshow
  );

  const slides: SlideItem[] = [
    { id, title, description, image: toSlideImage(coverImage[0]) },
    ...items.flatMap((item) =>
      item ? [{ ...item, image: toSlideImage(item.image[0]) }] : []
    ),
  ];

  return { title, slides };
}
