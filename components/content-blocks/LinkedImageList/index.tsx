import { FC } from "react";
import FlexibleLinkedImageList from "@/components/organisms/LinkedImageList/Flexible";
import { FragmentType, useFragment } from "@/gql";
import { LinkedImageListBlockFragmentDoc } from "@/gql/graphql";
import { MetadataAssetSchema } from "@/lib/api/galleries/schema";
import { z } from "zod";

interface LinkedImageListBlockProps
  extends FragmentType<typeof LinkedImageListBlockFragmentDoc> {
  locale: string;
}

const NullishString = z
  .string()
  .nullable()
  .transform((o) => o ?? undefined);
const LinkedImage = z.object({
  id: z.string(),
  image: z
    .array(MetadataAssetSchema)
    .nullable()
    .transform((o) => {
      if (Array.isArray(o)) {
        return o[0];
      }
    }),
  link: z.object({
    customText: NullishString,
    text: NullishString,
    target: NullishString,
    url: z.string().url(),
  }),
});
const ImageList = z.array(LinkedImage).min(1).max(4);

const LinkedImageListBlock: FC<LinkedImageListBlockProps> = ({
  locale,
  ...props
}) => {
  const { header, description, linkedImageList } = useFragment(
    LinkedImageListBlockFragmentDoc,
    props
  );

  const { data: list } = ImageList.safeParse(linkedImageList);

  if (!list) return null;

  return (
    <FlexibleLinkedImageList
      {...{ list }}
      title={header || undefined}
      description={description || undefined}
    />
  );
};

LinkedImageListBlock.displayName = "ContentBlock.LinkedImageList";

export default LinkedImageListBlock;
