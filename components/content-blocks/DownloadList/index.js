import { fileSize } from "@/helpers";
import * as Styled from "./styles";
import Container from "@/components/layout/Container";
import Buttonish from "@/components/atomic/Buttonish";

export default function DownloadList({ assetsList, ...props }) {
  function getIcon(kind) {
    switch (kind) {
      case "pdf":
        return "pdf";

      case "doc":
      case "docm":
      case "docx":
      case "dot":
      case "dotx":
        return "word";

      default:
        return "doc";
    }
  }

  return assetsList.length > 0 ? (
    <Container>
      {assetsList.map((asset) => (
        <Styled.DownloadButton
          as={Buttonish}
          key={asset.id}
          url={asset.assetSingle[0].url}
          download={asset.assetSingle[0].filename}
          icon={getIcon(asset.assetSingle[0].kind)}
          iconSize={32}
          styleAs="tertiary"
          isBlock
          text={
            <>
              {asset.linkText}{" "}
              <span>({fileSize(asset.assetSingle[0].size)})</span>
            </>
          }
        />
      ))}
    </Container>
  ) : null;
}
