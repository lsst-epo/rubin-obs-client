import PropTypes from "prop-types";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import * as Styled from "./styles";

export default function Tags({ tags, rootHomeLink }) {
  const { t } = useTranslation();

  if (!tags) return null;
  if (tags.length <= 0) return null;

  return (
    <Styled.AsideTags>
      <h3>{t(`tags`)}</h3>
      {tags.map((tag, i) => {
        if (rootHomeLink?.uri && tag.slug) {
          return (
            <Link
              key={i}
              prefetch={false}
              href={`/${rootHomeLink?.uri}?search=${tag.slug}`}
            >
              {`#${tag.title}`}
            </Link>
          );
        }
      })}
    </Styled.AsideTags>
  );
}

Tags.propTypes = {
  tags: PropTypes.array,
  rootHomeLink: PropTypes.object,
};
