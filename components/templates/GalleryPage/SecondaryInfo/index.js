import { Fragment } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import * as Styled from "./styles";

function SecondaryInfo({ variants = [], tags = [], parentPage }) {
  const { t } = useTranslation();
  return (
    <>
      {variants.length > 0 &&
        variants.map((variant, i) => {
          if (variant.assetHeader) {
            return (
              <h2 className="t-heading-quaternary" key={i}>
                {variant.assetHeader}
              </h2>
            );
          } else if (variant.assetLink?.length > 0) {
            return (
              <Fragment key={i}>
                <Link href={variant.assetLink[0].url}>
                  <a>
                    {variant.assetName || t(`gallery.${variant.commonName}`)}
                  </a>
                </Link>
                {variant.assetLink[0].kind === "image"
                  ? ` (${variant.assetLink[0].width} x ${variant.assetLink[0].height})`
                  : ` - ${(parseInt(variant.assetLink[0].size) / 1000).toFixed(
                      1
                    )} MB`}
              </Fragment>
            );
          } else {
            return null;
          }
        })}
      {!!tags?.length && (
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
      )}
    </>
  );
}

SecondaryInfo.displayName = "Template.GalleryPage.SecondaryInfo";

SecondaryInfo.propTypes = {
  variants: PropTypes.arrayOf(PropTypes.object),
  tags: PropTypes.arrayOf(PropTypes.string),
  parentPage: PropTypes.object,
};

export default SecondaryInfo;
