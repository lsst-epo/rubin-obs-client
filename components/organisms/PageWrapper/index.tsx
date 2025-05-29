import { FunctionComponent, PropsWithChildren, Suspense } from "react";
import {
  SignInModal,
  RegisterModal,
  SSOModal,
  ForgotPasswordModal,
  SetPasswordModal,
  ActivateModal,
} from "@/components/modal";
import { getGlobalData } from "@/lib/api/globals";
import { GlobalDataProvider } from "@/contexts/GlobalData";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";
import Center from "@rubin-epo/epo-react-lib/Center";

const PageWrapper: FunctionComponent<
  PropsWithChildren<{ locale: string }>
> = async ({ locale, children }) => {
  const globalData = await getGlobalData(locale);

  return (
    <GlobalDataProvider data={globalData}>
      <Center maxWidth="2000px">
        <Header locale={locale} />
        <main id="page-content">{children}</main>
        <Footer />
        <Suspense>
          <SignInModal />
          <RegisterModal />
          <SSOModal />
          <ForgotPasswordModal />
          <SetPasswordModal />
          <ActivateModal />
        </Suspense>
      </Center>
    </GlobalDataProvider>
  );
};

PageWrapper.displayName = "Organism.PageWrapper";

export default PageWrapper;
