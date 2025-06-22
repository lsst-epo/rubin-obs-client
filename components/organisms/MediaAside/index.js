import PropTypes from "prop-types";
import { getPathname, Link } from "@/lib/i18n/navigation";
import { getLocale } from "next-intl/server";
import IconComposer from "@rubin-epo/epo-react-lib/IconComposer";
import { imagesToAsides, videosToAsides } from "@/helpers/noirlab";
import { useTranslation } from "@/lib/i18n";
import Aside from "@/components/molecules/Aside/index";
import AsideSection from "@/components/molecules/Aside/Section";
import TagList from "@/components/molecules/TagList";
import AsideImage from "@/components/molecules/Aside/Image";
import GalleryAsset from "./GalleryAsset";
import styles from "./styles.module.css";

export default async function MediaAside({
  manualAssets,
  contentBlockAssets,
  releaseImages = [],
  releaseVideos = [],
  tags,
  rootHomeLink,
}) {
  const locale = await getLocale();
  const { t } = await useTranslation(locale);
  // This adds the document icon from the designs, if there is a text-style link near the start.
  let manualDoc = manualAssets.some(
    (a, i) => i < 4 && (a.textLink?.length > 0 || a.externalLink?.length > 0)
  );

  const tagsWithLinks = tags.map(({ slug, title }) => {
    return {
      name: title,
      destination: getPathname({
        href: { pathname: `/${rootHomeLink?.uri}`, query: { search: slug } },
        locale,
      }),
    };
  });

  const mediaAssets = [
    ...contentBlockAssets
      .filter(({ image }) => image && image.length > 0 && image[0].url)
      .map(({ caption, image }) => {
        const [{ altText, url, width, height }] = image;
        return {
          title: caption,
          image: { src: url, width, height, alt: altText || caption },
          link: { href: url },
        };
      }),
    ...imagesToAsides(releaseImages, locale),
    ...videosToAsides(releaseVideos, locale),
  ];

  return (
    <Aside {...{ tags, rootHomeLink }}>
      {manualAssets?.length > 0 && (
        <AsideSection>
          {manualAssets.map((a, i) => {
            if (a.assetHeader) {
              return (
                <h3 className={styles.manualDocHeader} key={i}>
                  {manualDoc === true && <IconComposer icon="Doc" />}
                  {a.assetHeader}
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
                  rel="noopener noreferrer"
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
