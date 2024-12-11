import PropTypes from "prop-types";
import Link from "next/link";
import {
  ResponsiveImage,
  IconComposer,
  Figure,
} from "@rubin-epo/epo-react-lib";
import MediaAssets from "./MediaSection";
import Aside from "../../index";
import AsideSection from "../../Section";

export default function MediaAside({
  manualAssets,
  contentBlockAssets,
  releaseImages,
  releaseVideos,
  tags,
  rootHomeLink,
}) {
  // This adds the document icon from the designs, if there is a text-style link near the start.
  let manualDoc = manualAssets.some(
    (a, i) => i < 4 && (a.textLink?.length > 0 || a.externalLink?.length > 0)
  );

  return (
    <Aside {...{ tags, rootHomeLink }}>
      {manualAssets?.length > 0 && (
        <AsideSection>
          {manualAssets.map((a, i) => {
            if (a.assetHeader) {
              return (
                <h3 key={i}>
                  {a.assetHeader}{" "}
                  {manualDoc === true && <IconComposer icon="Doc" />}
                </h3>
              );
            } else if (a.textLink?.length > 0) {
              if (a.textLink[0].url) {
                return (
                  <Link key={i} prefetch={false} href={a.textLink[0].url}>
                    {a.text}
                  </Link>
                );
              }
            } else if (a.externalLink) {
              manualDoc = true;
              return (
                <a
                  href={a.externalLink}
                  key={i}
                  target="_blank"
                  rel="noreferrer"
                >
                  {a.text}
                </a>
              );
            } else if (a.image?.length > 0) {
              return (
                <Link key={i} prefetch={false} href={a.image[0].url}>
                  <Figure caption={a.caption}>
                    <ResponsiveImage image={a.image[0]} ratio="8:5" />
                  </Figure>
                </Link>
              );
            }
          })}
        </AsideSection>
      )}
      <MediaAssets
        contentBlockAssets={contentBlockAssets}
        releaseImages={releaseImages}
        releaseVideos={releaseVideos}
      />
    </Aside>
  );
}

MediaAside.propTypes = {
  manualAssets: PropTypes.array,
  contentBlockAssets: PropTypes.array,
  releaseImages: PropTypes.array,
  releaseVideos: PropTypes.array,
  tags: PropTypes.array,
  rootHomeLink: PropTypes.object,
};
