import { FC } from "react";
import { DigitalDocument } from "schema-dts";
import Image from "next/image";
import StructuredData from "@/components/atomic/StructuredData";
import { CantoAssetDetailed } from "@/lib/api/galleries/schema";
import { assetAlt } from "@/lib/api/canto/metadata";
import { tokens } from "@rubin-epo/epo-react-lib/styles";
import { resizeCantoImage } from "@/lib/api/canto/resize";

interface CantoDocumentProps {
  locale: string;
  asset: CantoAssetDetailed;
  license?: string;
}

const CantoDocument: FC<CantoDocumentProps> = ({ locale, asset, license }) => {
  const { additional, url, width, height } = asset;

  const aspectRatio = width / height;
  const landscapeSizes = `(max-width: ${tokens.BREAK_TABLET}) 100vw, 1435px`;
  const portraitSizes = `(max-width: ${tokens.BREAK_TABLET}) 100vw, 700px`;

  const structuredData: DigitalDocument = {
    "@type": "DigitalDocument",
    size: asset.size,
    url: url.directUrlOriginal,
    creditText: asset.additional.Credit || undefined,
    encodingFormat: asset.default.ContentType,
    dateCreated: asset.default.DateCreated,
    thumbnailUrl: resizeCantoImage(url.directUrlPreview, 100),
    license,
  };

  return (
    <>
      <StructuredData jsonLd={structuredData} />
      <Image
        {...{ width, height }}
        data-cy="canto-image"
        alt={assetAlt(additional, locale)}
        src={resizeCantoImage(url.directUrlPreview, 2050)}
        sizes={aspectRatio < 1 ? portraitSizes : landscapeSizes}
        quality={85}
        priority
        title={asset.name}
      />
    </>
  );
};

CantoDocument.displayName = "Organism.Gallery.CantoDocument";

export default CantoDocument;
