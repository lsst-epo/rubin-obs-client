import { FC } from "react";
import { CantoAssetScheme } from "@/lib/api/galleries/schema";
import { getLinkedPosts } from "@/lib/api/galleries/asset";
import { addLocaleUriSegment, useTranslation } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/server";
import MetadataSection from "../Section";
import TagList from "@/components/molecules/TagList";

interface LinkedPostsProps {
  id: string;
  scheme: CantoAssetScheme;
}

const LinkedPosts: FC<LinkedPostsProps> = async ({ id, scheme }) => {
  const locale = getLocale();
  const { t } = await useTranslation(locale);
  const posts = await getLinkedPosts(id);

  if (posts.length === 0) return null;

  return (
    <MetadataSection
      title={t(`gallery.${scheme}-linked-to`)}
      metadata={
        <TagList
          tags={posts.map(({ title, uri }) => {
            return {
              name: title,
              destination: addLocaleUriSegment(locale, uri),
            };
          })}
          showPound={false}
          withLinebreaks
        />
      }
    />
  );
};

LinkedPosts.displayName = "Organism.Gallery.Metadata.LinkedPosts";

export default LinkedPosts;
