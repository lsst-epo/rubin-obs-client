import { FC } from "react";
import { FragmentType, useFragment } from "@/gql";
import { InlineSlideshowBlockFragmentDoc } from "@/gql/graphql";
import InlineSlideshow from "@/components/molecules/InlineSlideshow";

type InlineSlideshowBlockProps = FragmentType<
  typeof InlineSlideshowBlockFragmentDoc
>;

const InlineSlideshowBlock: FC<InlineSlideshowBlockProps> = (props) => {
  const { slideshowEntry, backgroundColor } = useFragment(
    InlineSlideshowBlockFragmentDoc,
    props
  );
  const [slideshow] = slideshowEntry;

  if (slideshow?.__typename !== "slideshows_slideshow_Entry") return null;

  return <InlineSlideshow slideshow={slideshow} bgColor={backgroundColor} />;
};

InlineSlideshowBlock.displayName = "ContentBlock.InlineSlideshow";

export default InlineSlideshowBlock;
