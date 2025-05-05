import { CantoAssetDetailed } from "@/lib/api/galleries/schema";
import { FC, Suspense } from "react";
import CantoImage from "@/components/organisms/gallery/CantoImage";
import { getGalleryForAsset } from "@/lib/api/galleries/asset";
import { addLocaleUriSegment } from "@/lib/i18n";

interface InlineCantoImageProps {
  locale: string;
  asset: CantoAssetDetailed;
}

const InlineCantoImageContent: FC<InlineCantoImageProps> = async ({
  locale,
  asset,
}) => {
  const gallery = await getGalleryForAsset(asset.id);

  return (
    <CantoImage
      link={
        gallery
          ? { href: addLocaleUriSegment(locale, `${gallery}/${asset.id}`) }
          : undefined
      }
      {...{ locale, asset }}
    />
  );
};

const InlineCantoImage: FC<InlineCantoImageProps> = (props) => {
  return (
    <Suspense fallback={<CantoImage {...props} />}>
      <InlineCantoImageContent {...props} />
    </Suspense>
  );
};

export default InlineCantoImage;
