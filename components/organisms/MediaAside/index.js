import PropTypes from "prop-types";
import Link from "next/link";
import IconComposer from "@rubin-epo/epo-react-lib/IconComposer";
import { addLocaleUriSegment, useTranslation } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/server";
import Aside from "@/components/molecules/Aside/index";
import AsideSection from "@/components/molecules/Aside/Section";
import TagList from "@/components/molecules/TagList";
import AsideImage from "@/components/molecules/Aside/Image";
import GalleryAsset from "./GalleryAsset";

export default async function MediaAside({
  manualAssets,
  contentBlockAssets,
  releaseImages = [],
  releaseVideos = [],
  tags,
  rootHomeLink,
}) {
  const locale = getLocale();
  const { t } = await useTranslation(locale);
  // This adds the document icon from the designs, if there is a text-style link near the start.
  let manualDoc = manualAssets.some(
    (a, i) => i < 4 && (a.textLink?.length > 0 || a.externalLink?.length > 0)
  );

  const tagsWithLinks = tags.map(({ slug, title }) => {
    return {
      name: title,
      destination: addLocaleUriSegment(
        locale,
        `/${rootHomeLink?.uri}?search=${slug}`
      ),
    };
  });

  const mapReleaseAsset = ({
    title,
    url,
    height,
    width,
    formats: { newsfeature },
  }) => {
    return {
      caption: title,
      image: {
        altText: title,
        url: newsfeature,
        url2x: newsfeature,
        url3x: newsfeature,
        width,
        height,
      },
      link: { href: url },
    };
  };

  const mediaAssets = [
    ...contentBlockAssets
      .filter(({ image }) => image && image.length > 0 && image[0].url)
      .map(({ caption, image }) => {
        return {
          caption,
          image: image?.[0],
          link: { href: image?.[0]?.url },
        };
      }),
    ...releaseImages.map(mapReleaseAsset),
    ...releaseVideos.map(mapReleaseAsset),
  ];

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
                <AsideImage
                  key={i}
                  caption={a.caption}
                  image={a.image[0]}
                  link={{ href: a.image[0].url }}
                />
              );
            } else if (a.asset?.length > 0) {
              return <GalleryAsset key={i} asset={a.asset[0]} />;
            }
          })}
        </AsideSection>
      )}
      {mediaAssets.length > 0 && (
        <AsideSection title={t(`media`)}>
          {mediaAssets.map((props, i) => {
            return <AsideImage key={i} {...props} />;
          })}
        </AsideSection>
      )}

      {tagsWithLinks.length > 0 && (
        <AsideSection title={t(`tags`)}>
          <TagList tags={tagsWithLinks} />
        </AsideSection>
      )}
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
