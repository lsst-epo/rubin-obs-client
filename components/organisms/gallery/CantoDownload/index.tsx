import { useTranslation } from "@/lib/i18n";
import Buttonish from "@rubin-epo/epo-react-lib/Buttonish";
import { FunctionComponent } from "react";

interface CantoDownloadProps {
  directUrlOriginal: string;
}

const CantoDownload: FunctionComponent<CantoDownloadProps> = async ({
  directUrlOriginal,
}) => {
  const { t } = await useTranslation();
  const { pathname, searchParams, search } = new URL(directUrlOriginal);
  const [, , scheme, contentId, directUrlOriginalHash] = pathname.split("/");

  return (
    <Buttonish
      data-cy="canto-download"
      url={`/api/canto/${scheme}/${contentId}/${directUrlOriginalHash}${search}`}
      text={t(`gallery.download-${scheme}`)}
      download={searchParams.get("name")}
      rel="alternate"
    />
  );
};

CantoDownload.displayName = "Organism.Gallery.CantoDownload";

export default CantoDownload;
