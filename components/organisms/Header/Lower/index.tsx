import { FunctionComponent } from "react";
import { getNavigationItems } from "@/lib/api/globals";
import NavigationHorizontal from "../navigation/Horizontal";
import HeaderLevel from "@/components/molecules/HeaderLevel";
import SearchBar from "@/components/molecules/SearchBar";

import LanguageSelect from "../LanguageSelect";
import styles from "./styles.module.scss";
import NavigationVertical from "../navigation/Vertical";

interface LowerHeaderProps {
  locale: string;
}

const LowerHeader: FunctionComponent<LowerHeaderProps> = async ({ locale }) => {
  const navigationItems = await getNavigationItems(locale);

  return (
    <HeaderLevel className={styles.lower}>
      <NavigationHorizontal
        className={styles.desktopNavigation}
        locale={locale}
        items={navigationItems}
      />
      <div className={styles.mobileLanguageToggle}>
        <LanguageSelect />
      </div>
      <div className={styles.lowerControls}>
        <SearchBar />
        <NavigationVertical locale={locale} items={navigationItems} />
      </div>
    </HeaderLevel>
  );
};

LowerHeader.displayName = "Organism.Header.Lower";

export default LowerHeader;
