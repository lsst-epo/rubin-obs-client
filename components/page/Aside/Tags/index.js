import PropTypes from "prop-types";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import AsideSection from "../Section";
import * as Styled from "./styles";

export default function Tags({ tags, rootHomeLink }) {
  const { t } = useTranslation();

  if (!tags) return null;
  if (tags.length <= 0) return null;

  return (
    <AsideSection title={t(`tags`)}>
      <Styled.TagList>
        {tags.map((tag, i) => {
          if (rootHomeLink?.uri && tag.slug) {
            return (
              <Styled.Tag key={i}>
                <Link
                  prefetch={false}
                  href={`/${rootHomeLink?.uri}?search=${tag.slug}`}
                >
                  {`#${tag.title}`}
                </Link>
              </Styled.Tag>
            );
          }
        })}
      </Styled.TagList>
    </AsideSection>
  );
}

Tags.displayName = "Page.Aside.Tags";

Tags.propTypes = {
  tags: PropTypes.array,
  rootHomeLink: PropTypes.object,
};
