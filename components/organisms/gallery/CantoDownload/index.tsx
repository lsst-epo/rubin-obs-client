import Buttonish from "@rubin-epo/epo-react-lib/Buttonish";
import { FunctionComponent } from "react";

interface CantoDownloadProps {
  directUrlOriginal: string;
}

const CantoDownload: FunctionComponent<CantoDownloadProps> = ({
  directUrlOriginal,
}) => {
  const { pathname, searchParams, search } = new URL(directUrlOriginal);
  const [, , scheme, contentId, directUrlOriginalHash] = pathname.split("/");

  return (
    <Buttonish
      url={`/api/canto/${scheme}/${contentId}/${directUrlOriginalHash}${search}`}
      text="Download"
      download={searchParams.get("name")}
      rel="alternate"
    />
  );
};

CantoDownload.displayName = "Organism.Gallery.CantoDownload";

export default CantoDownload;
