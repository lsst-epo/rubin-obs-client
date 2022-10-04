import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Body from "@/global/Body";
import Breadcrumbs from "@/page/Breadcrumbs";
import Container from "@/layout/Container";
import Accordion from "@/atomic/Accordion";
import Buttonish from "@/atomic/Buttonish";
import { shapeGalleryAssetData } from "@/lib/api/gallery";
import { useCustomBreadcrumbs } from "@/lib/utils";
import Metadata from "./Metadata";
import SecondaryInfo from "./SecondaryInfo";
import * as Styled from "./styles";

function GalleryPage({ assetData, metadataDefaults, language }) {
  const { t } = useTranslation();
  const { id, uri, scheme, title, description, image, tags, metadata } =
    shapeGalleryAssetData({ assetData, language, metadataDefaults });
  console.info(tags);

  const customBreadcrumbs = useCustomBreadcrumbs("Gallery");
  const parentPage = customBreadcrumbs.slice(-1)[0];
  const pageLink = {
    id,
    uri,
    title,
    active: true,
  };

  return (
    <Body title={title} description={description} featuredImage={[image]}>
      <Breadcrumbs breadcrumbs={[...customBreadcrumbs, pageLink]} />
      <Container width="regular">
        <h1>{title}</h1>
      </Container>
      <Styled.Tile>
        {/* {videoUrl ? (
          <Video url={videoUrl} />
        ) : (
          <ResponsiveImage image={image} ratio="4:3" />
        )} */}
        <Styled.Image
          src={image.url}
          width={image.width}
          height={image.height}
          alt={image.altText}
          loading="lazy"
        />
        <div className="c-content-rte">
          <p>{description}</p>
        </div>
        {scheme === "image" && (
          <div>
            <Buttonish
              url={image.url}
              text={t(`gallery.download-${scheme}`)}
              target="_blank"
              rel="noreferrer"
            />
          </div>
        )}
      </Styled.Tile>
      <Styled.ContainerDesktop>
        <div>
          <h2 className="t-heading-quaternary">
            {t(`gallery.about-the-${scheme}`)}
          </h2>
          <Styled.Details>
            <Metadata data={metadata} />
          </Styled.Details>
        </div>
        <div>
          <SecondaryInfo variants={[]} tags={tags} parentPage={parentPage} />
        </div>
      </Styled.ContainerDesktop>
      <Styled.ContainerMobile>
        <Accordion key={id} summary={t(`gallery.additional-information`)}>
          <Styled.AccordionInner>
            <div>
              <h4>{t(`gallery.about-the-${scheme}`)}</h4>
              <Metadata data={metadata} />
            </div>
            <div>
              <SecondaryInfo
                variants={[]}
                tags={tags}
                parentPage={parentPage}
              />
            </div>
          </Styled.AccordionInner>
        </Accordion>
      </Styled.ContainerMobile>
      <Container width="regular">
        <Buttonish
          url={`/${parentPage?.uri}`}
          text={t(`gallery.back-to-${scheme}`)}
          isBlock={true}
        />
      </Container>
    </Body>
  );
}

GalleryPage.displayName = "Template.GalleryPage";

GalleryPage.propTypes = {
  assetData: PropTypes.shape({
    id: PropTypes.string,
    scheme: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.object,
    tags: PropTypes.arrayOf(PropTypes.string),
    metadata: PropTypes.object,
  }),
  metadataDefaults: PropTypes.object,
  language: PropTypes.string,
};

export default GalleryPage;
