import { FunctionComponent } from "react";
import HeaderLevel from "@/components/molecules/HeaderLevel";
import Logo from "@/components/molecules/Logo";
import LanguageSelect from "../LanguageSelect";
import SearchBar from "../../../molecules/SearchBar";
import styles from "./styles.module.scss";
import { getLogos } from "@/services/craft/globals/logos";

interface UpperHeaderProps {
  locale: string;
}

const UpperHeader: FunctionComponent<UpperHeaderProps> = async ({ locale }) => {
  const logos = await getLogos();

  return (
    <HeaderLevel className={styles.upper}>
      {logos && <Logo {...{ locale, ...logos }} />}
      <div className={styles.upperControls}>
        <SearchBar />
        <LanguageSelect />
      </div>
    </HeaderLevel>
  );
};

UpperHeader.displayName = "Organism.Header.Upper";

export default UpperHeader;
