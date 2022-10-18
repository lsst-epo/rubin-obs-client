import { Fragment } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import * as Styled from "./styles";

function SecondaryInfo({ tags = [], parentPage }) {
  const { t } = useTranslation();
  return (
    !!tags?.length && (
      <>
        <h2 className="t-heading-quaternary">{t(`gallery.tags`)}</h2>
        <Styled.LinkList>
          {tags.map((tag) => (
            <li key={tag} className="c-content-rte">
              <Link href={`/${parentPage?.uri}?tags=${tag}`}>
                <a>{`#${tag}`}</a>
              </Link>
            </li>
          ))}
        </Styled.LinkList>
      </>
    )
  );
}

SecondaryInfo.displayName = "Template.GalleryPage.SecondaryInfo";

SecondaryInfo.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  parentPage: PropTypes.object,
};

export default SecondaryInfo;
