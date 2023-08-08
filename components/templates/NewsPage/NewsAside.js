import PropTypes from "prop-types";
import Link from "next/link";
import { ResponsiveImage, IconComposer } from "@rubin-epo/epo-react-lib";
import Tags from "./Tags";
import MediaAssets from "./MediaAssets";
import * as Styled from "./styles";

export default function NewsAside({
  newsAssets,
  contentBlockAssets,
  releaseImages,
  releaseVideos,
  tags,
  rootHomeLink,
}) {
  // This sets up the automatic media grabber -- if there are no manual media set
  let manualMedia = false;
  // This adds the document icon from the designs, if there is a text-style link near the start.
  let manualDoc = newsAssets.some(
    (a, i) => i < 4 && (a.textLink?.length > 0 || a.externalLink?.length > 0)
  );

  return (
    <Styled.Aside>
      {newsAssets?.length > 0 && (
        <Styled.AsidePrimary>
          {newsAssets.map((a, i) => {
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
              manualMedia = true;
              return (
                <a href={a.image[0].url} key={i}>
                  <ResponsiveImage image={a.image[0]} />
                </a>
              );
            } else if (a.galleryItem?.length > 0) {
              manualMedia = true;
              if (a.galleryItem[0].uri) {
                return (
                  <Link
                    prefetch={false}
                    href={`/${a.galleryItem[0].uri}`}
                    key={i}
                  >
                    <ResponsiveImage
                      image={a.galleryItem[0].representativeAssetVariant[0]}
                    />
                  </Link>
                );
              }
            }
          })}
        </Styled.AsidePrimary>
      )}
      <MediaAssets
        contentBlockAssets={contentBlockAssets}
        releaseImages={releaseImages}
        releaseVideos={releaseVideos}
      />
      <Tags tags={tags} rootHomeLink={rootHomeLink} />
    </Styled.Aside>
  );
}

NewsAside.propTypes = {
  newsAssets: PropTypes.array,
  contentBlockAssets: PropTypes.array,
  releaseImages: PropTypes.array,
  releaseVideos: PropTypes.array,
  tags: PropTypes.array,
  rootHomeLink: PropTypes.object,
};
