import PropTypes from "prop-types";
import Link from "next/link";
import { ResponsiveImage, Figure } from "@rubin-epo/epo-react-lib";

export default function ReleaseAssets({ assets }) {
  if (!assets) return null;

  if (assets.length <= 0) return null;

  return (
    <>
      {assets.map((asset, i) => {
        const {
          id,
          title,
          url,
          height,
          width,
          formats_url: { newsfeature },
        } = asset;

        return (
          <Link key={i} prefetch={false} href={url} target="_blank">
            <Figure caption={title}>
              <ResponsiveImage
                image={{
                  altText: title,
                  url: newsfeature,
                  url2x: newsfeature,
                  url3x: newsfeature,
                  width,
                  height,
                }}
                ratio="8:5"
              />
            </Figure>
            <div></div>
          </Link>
        );
      })}
    </>
  );
}

ReleaseAssets.propTypes = {
  assets: PropTypes.array,
};
