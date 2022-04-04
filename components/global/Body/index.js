import PropTypes from "prop-types";
import styled from "styled-components";
import GlobalDataContext from "@/contexts/GlobalData";
import HtmlHead from "@/global/HtmlHead";
import Header from "@/global/Header";
import Footer from "@/global/Footer";
import imageShape from "@/shapes/image";

export default function Body({ children, description, featuredImage, title }) {
  return (
    <GlobalDataContext.Consumer>
      {({ siteInfo, headerNavItems, userProfilePage, footerContent }) => {
        const {
          siteTitle,
          siteDescription,
          siteImage,
          contactInfo,
          handle,
          language,
          name,
          ...socialInfo
        } = siteInfo;

        return (
          <>
            <HtmlHead
              title={title}
              description={description}
              featuredImage={featuredImage}
              siteInfo={siteInfo}
            />
            <WideWidthContainer>
              <Header
                navItems={headerNavItems}
                userProfilePage={userProfilePage}
              />
              <main id="page-content">{children}</main>
              <Footer socialInfo={socialInfo} content={footerContent} />
            </WideWidthContainer>
          </>
        );
      }}
    </GlobalDataContext.Consumer>
  );
}

const WideWidthContainer = styled.div`
  max-width: 2000px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;
Body.displayName = "Global.Body";

Body.propTypes = {
  children: PropTypes.node,
  description: PropTypes.string,
  featuredImage: PropTypes.arrayOf(imageShape),
  title: PropTypes.string.isRequired,
};
