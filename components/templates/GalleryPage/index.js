/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
import striptags from "striptags";
import { useTranslation } from "react-i18next";
import {
  createLocationString,
  useCustomBreadcrumbs,
  useDateString,
} from "@/lib/utils";
import Body from "@/global/Body";
import Breadcrumbs from "@/page/Breadcrumbs";
import Container from "@/layout/Container";
import ResponsiveImage from "@/atomic/ResponsiveImage";
import { Video } from "@/components/atomic";
import Accordion from "@/atomic/Accordion";
import { Buttonish } from "@/components/atomic";
import { containerNarrow, respond } from "@/styles/globalStyles";

export default function GalleryPage({
  data: {
    entry: {
      assetVariants,
      credit,
      customDateCreated,
      featuredImage,
      galleryItemCategory,
      galleryItemTags,
      id,
      metadataDate,
      metadataVersion,
      publisher,
      publisherId,
      richTextDescription,
      subLocation,
      title,
      uri,
      usageTerms,
      videoUrl,
    },
    globals: {
      creditDefault,
      metadataVersionDefault,
      publisherDefault,
      publisherIdDefault,
      usageTermsDefault,
    },
  },
}) {
  const { t } = useTranslation();
  const bodyProps = {
    description: striptags(richTextDescription),
    featuredImage,
    title,
  };

  const customBreadcrumbs = useCustomBreadcrumbs("Gallery");

  // add category strings and pre-filtered crumb: id, title, uri
  let typeId = "";
  let typeTitlePlural = "";
  let typeSlug = "gallery";

  if (galleryItemCategory.length > 0) {
    typeId = galleryItemCategory[0].id;
    typeTitlePlural = t(`gallery.plural-${galleryItemCategory[0].slug}`);
    typeSlug = galleryItemCategory[0].slug;

    customBreadcrumbs.push({
      id: typeId,
      title: typeTitlePlural,
      uri: `gallery?filter=${typeId}`,
    });
  }

  const rootHomeLink = customBreadcrumbs.slice(-1)[0];
  const galleryHomeLink = customBreadcrumbs.slice(0, 1)[0];
  const pageLink = {
    id,
    uri,
    title,
    active: true,
  };

  const image = featuredImage[0];

  // localized dates
  const localizedMetadataDate = useDateString(metadataDate);
  const localizedCustomDate = useDateString(customDateCreated);

  // logic for displaying city/state in US, city/country outside
  let loc;
  if (subLocation.length > 0) {
    loc =
      subLocation[0].title +
      ", " +
      createLocationString(
        subLocation[0].city,
        subLocation[0].state,
        subLocation[0].country
      );
  }

  const SecondaryInfo = () => (
    <>
      {assetVariants.length > 0 &&
        assetVariants.map((a, i) => {
          if (a.assetHeader) {
            return (
              <h2 className="t-heading-quaternary" key={i}>
                {a.assetHeader}
              </h2>
            );
          } else if (a.assetLink?.length > 0) {
            return (
              <React.Fragment key={i}>
                <Link href={a.assetLink[0].url}>
                  {a.assetName || t(`gallery.${a.commonName}`)}
                </Link>
                {a.assetLink[0].kind === "image"
                  ? ` (${a.assetLink[0].width} x ${a.assetLink[0].height})`
                  : ` - ${(parseInt(a.assetLink[0].size) / 1000).toFixed(
                      1
                    )} MB`}
              </React.Fragment>
            );
          } else {
            return null;
          }
        })}
      {galleryItemTags?.length > 0 && (
        <>
          <h2 className="t-heading-quaternary">{t(`gallery.tags`)}</h2>
          {galleryItemTags.map((tag, i) => (
            <Link key={i} href={`/${galleryHomeLink?.uri}?search=${tag.slug}`}>
              {`#${tag.title} `}
            </Link>
          ))}
        </>
      )}
    </>
  );

  return (
    <Body {...bodyProps}>
      <Breadcrumbs breadcrumbs={[...customBreadcrumbs, pageLink]} />
      <Container width="regular">
        <h1>{title}</h1>
      </Container>
      <Tile>
        {videoUrl ? (
          <Video url={videoUrl} />
        ) : (
          <ResponsiveImage image={image} ratio="4:3" />
        )}
        <div
          className="c-content-rte"
          dangerouslySetInnerHTML={{ __html: richTextDescription }}
        />
        {!videoUrl && (
          <div>
            <Buttonish
              url={image.url}
              text={t(`gallery.download-${typeSlug}`)}
            />
          </div>
        )}
      </Tile>
      <ContainerDesktop>
        <div>
          <h2 className="t-heading-quaternary">
            {t(`gallery.about-the-${typeSlug}`)}
          </h2>
          <Details>
            <div>Credit:</div>
            <div>{credit || creditDefault}</div>
            {loc && (
              <>
                <div>Location: </div>
                <div>{loc}</div>
              </>
            )}
            {metadataDate && (
              <>
                <div>Metadata Date:</div>
                <div>{localizedMetadataDate}</div>
              </>
            )}
            <div>Metadata Version:</div>
            <div>{metadataVersion || metadataVersionDefault}</div>
            <div>Publisher:</div>
            <div>{publisher || publisherDefault}</div>
            <div>Publisher ID:</div>
            <div>{publisherId || publisherIdDefault}</div>
            {customDateCreated && (
              <>
                <div>Date Created:</div>
                <div>{localizedCustomDate}</div>
              </>
            )}
            <div>Usage Terms:</div>
            <div
              className="c-content-rte"
              dangerouslySetInnerHTML={{
                __html: usageTerms || usageTermsDefault,
              }}
            />
          </Details>
        </div>
        <div className="c-content-rte">
          <SecondaryInfo />
        </div>
      </ContainerDesktop>
      <ContainerMobile>
        <Accordion key={id} summary={t(`gallery.additional-information`)}>
          <div>
            <h4>{t(`gallery.about-the-${typeSlug}`)}</h4>
            <div>Credit: {credit || creditDefault}</div>
            {loc && (
              <>
                <div>Location: </div>
                <div>{loc}</div>
              </>
            )}
            {metadataDate && <div>Metadata Date: {localizedMetadataDate}</div>}
            <div>
              Metadata Version: {metadataVersion || metadataVersionDefault}
            </div>
            <div>Publisher: {publisher || publisherDefault}</div>
            <div>Publisher ID: {publisherId || publisherIdDefault}</div>
            {customDateCreated && (
              <div>Date Created: {localizedCustomDate}</div>
            )}
            <div
              className="c-content-rte"
              dangerouslySetInnerHTML={{
                __html: `Usage Terms: ${usageTerms || usageTermsDefault}`,
              }}
            />
            <SecondaryInfo />
          </div>
        </Accordion>
      </ContainerMobile>
      <Container width="regular">
        <Buttonish
          url={`/${rootHomeLink?.uri}`}
          text={t(`gallery.back-to-${typeSlug}`)}
          isBlock={true}
        />
      </Container>
    </Body>
  );
}

const Tile = styled.div`
  ${containerNarrow()}
  display: grid;
  grid-gap: 20px;
  padding: 30px;
  background-color: var(--neutral10);
`;

const ContainerDesktop = styled(Container)`
  h4:not(:first-of-type) {
    margin-top: 1rem;
  }

  ${respond(`display: none;`)}
  > div {
    display: grid;
    grid-template: auto / 2fr 1fr;
    grid-gap: 20px;
    font-size: 16px;
  }
`;

const Details = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-gap: 10px 20px;
`;

const ContainerMobile = styled(Container)`
  > div {
    display: none;
    font-size: 14px;

    h4:not(:first-of-type) {
      margin-top: 1rem;
    }

    p:first-of-type {
      display: inline-block;
    }

    ${respond(`display: block;
      padding-top: 1rem;`)}
  }
`;

GalleryPage.displayName = "Template.GalleryPage";

GalleryPage.propTypes = {
  data: PropTypes.object,
  breadcrumbs: PropTypes.array,
};
