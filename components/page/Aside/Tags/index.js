import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import AsideSection from "../Section";
import TagList from "@/components/molecules/TagList";

export default function Tags({ tags, rootHomeLink }) {
  const { t } = useTranslation();

  if (!tags) return null;
  if (tags.length <= 0) return null;

  const tagsWithLinks = tags.map(({ slug, title }) => {
    return {
      name: title,
      destination: `/${rootHomeLink?.uri}?search=${slug}`,
    };
  });

  return (
    <AsideSection title={t(`tags`)}>
      <TagList tags={tagsWithLinks} />
    </AsideSection>
  );
}

Tags.displayName = "Page.Aside.Tags";

Tags.propTypes = {
  tags: PropTypes.array,
  rootHomeLink: PropTypes.object,
};
