import { createContext } from "react";
import PropTypes from "prop-types";
import { internalLinkWithChildrenShape } from "@/shapes/link";
import siteInfoShape from "@/shapes/siteInfo";
import footerContentShape from "@/shapes/footerContent";
import rootPagesShape from "@/shapes/rootPages";

const GlobalDataContext = createContext(null);

function GlobalDataProvider({ data, children }) {
  return (
    <GlobalDataContext.Provider value={data}>
      {children}
    </GlobalDataContext.Provider>
  );
}

GlobalDataProvider.displayName = "GlobalData.Provider";

GlobalDataProvider.propTypes = {
  children: PropTypes.node,
  data: PropTypes.exact({
    categories: PropTypes.array,
    footerContent: footerContentShape,
    headerNavItems: PropTypes.arrayOf(internalLinkWithChildrenShape),
    localeInfo: PropTypes.object,
    rootPages: rootPagesShape,
    siteInfo: siteInfoShape,
    userProfilePage: PropTypes.object,
    investigation: PropTypes.object,
  }),
};

export default GlobalDataContext;

export { GlobalDataProvider };
