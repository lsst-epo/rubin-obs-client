import { FunctionComponent, PropsWithChildren } from "react";
import { getGlobalData } from "@/lib/api/globals";
import { GlobalDataProvider } from "@/contexts/GlobalData";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import Center from "@rubin-epo/epo-react-lib/Center";

const PageWrapper: FunctionComponent<
  PropsWithChildren<{ locale: string }>
> = async ({ locale, children }) => {
  const globalData = await getGlobalData(locale);
  const {
    headerNavItems,
    userProfilePage,
    footerContent,
    contactForm,
    siteInfo: { email, facebook, instagram, linkedIn, twitter, youTube },
  } = globalData;

  return (
    <GlobalDataProvider data={globalData}>
      <Center maxWidth="2000px">
        <Header
          navItems={headerNavItems}
          userProfilePage={userProfilePage}
          locale={locale}
        />
        <main id="page-content">{children}</main>
        <Footer
          socialInfo={{
            email,
            facebook,
            instagram,
            linkedIn,
            twitter,
            youTube,
          }}
          content={footerContent}
          contactForm={contactForm}
        />
      </Center>
    </GlobalDataProvider>
  );
};

PageWrapper.displayName = "Organism.PageWrapper";

export default PageWrapper;
