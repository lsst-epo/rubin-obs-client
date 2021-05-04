import PropTypes from "prop-types";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useCustomBreadcrumbs } from "@/lib/utils";
import Body from "@/global/Body";
import { Share } from "@/content-blocks";
import Breadcrumbs from "@/page/Breadcrumbs";
import Container from "@/layout/Container";
import Image from "@/primitives/Image";
import StaffList from "@/dynamic/StaffList";
import { respond } from "@/styles/globalStyles";

export default function StaffPage({
  data: {
    featuredImage = [],
    staffPullQuote,
    id,
    plainText: staffTitle,
    staffBio,
    staffLocation,
    image = [],
    staffType = [],
    title,
    uri,
  },
}) {
  const { t } = useTranslation();
  const customBreadcrumbs = useCustomBreadcrumbs("Staff Profiles");
  const rootHomeLink = customBreadcrumbs.slice(-1)[0];
  const bodyProps = {
    featuredImage,
    title,
  };
  const pageLink = {
    id,
    uri,
    title,
    active: true,
  };

  return (
    <Body {...bodyProps}>
      <Breadcrumbs breadcrumbs={[...customBreadcrumbs, pageLink]} />
      <Container>
        <div>
          {staffType?.[0]?.slug && (
            <Pretitle>{t(`staff.${staffType?.[0]?.slug}`)}</Pretitle>
          )}
          <h1>{title}</h1>
          <Subtitle>
            {staffTitle}
            {staffLocation && `, ${staffLocation}`}
          </Subtitle>
        </div>
        <PortraitBlock>
          {image[0] && (
            <Portrait>
              <Image image={image[0]} />
            </Portrait>
          )}
          {staffPullQuote && <PortraitText>{staffPullQuote}</PortraitText>}
        </PortraitBlock>
      </Container>
      <Share />
      <Container>
        <div
          className="c-content-rte"
          dangerouslySetInnerHTML={{ __html: staffBio }}
        />
      </Container>
      <StaffList
        excludeId={id}
        header={t(`staff.browse-more`)}
        limit={4}
        button={{
          text: t(`staff.back-to-profiles`),
          uri: `${rootHomeLink?.uri}`,
        }}
        isWide={true}
      />
    </Body>
  );
}

const Pretitle = styled.h4`
  padding-bottom: 10px;
`;

const Subtitle = styled.div`
  padding-top: 10px;
`;

const PortraitBlock = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-column-gap: 20px;
  margin-top: 2em;
  align-items: center;

  ${respond(`grid-template-columns: 1fr;`)}
`;

const Portrait = styled.div`
  img {
    margin: 10px auto 25px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const PortraitText = styled.blockquote`
  flex: 10 0 20em;
  font-weight: 700;
  color: var(--neutral60);
`;

StaffPage.displayName = "Template.StaffPage";

StaffPage.propTypes = {
  data: PropTypes.object,
};
