import PropTypes from "prop-types";
import { GlobalDataProvider } from "@/contexts/GlobalData";
import { getGlobalData } from "@/api/global";
import GalleryPageTemplate from "@/templates/GalleryPage";
import { updateI18n } from "@/lib/i18n";

export default function Page({ assetData, globalData }) {
  updateI18n("es");
  return (
    <GlobalDataProvider data={globalData}>
      <GalleryPageTemplate
        assetData={assetData}
        language={globalData.localeInfo.language}
      />
    </GlobalDataProvider>
  );
}

Page.propTypes = {
  assetData: PropTypes.object,
  globalData: PropTypes.object,
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params: { id } }) {
  const scheme = "image";
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/canto-assets/${id}?scheme=${scheme}`
  );

  const site = "es";
  const globalData = await getGlobalData({
    site,
    entryData: {
      language: "es",
      localized: [{ language: "en-US", uri: `gallery/${id}` }],
    },
  });

  if (!data) {
    return {
      notFound: true,
    };
  }
  const json = await data.json();

  return {
    props: {
      assetData: json,
      globalData,
    },
  };
}
