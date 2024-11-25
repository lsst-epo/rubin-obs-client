import { FunctionComponent } from "react";
import HeaderLevel from "@/components/molecules/HeaderLevel";
import Logo from "@/components/molecules/Logo";
import LanguageSelect from "../LanguageSelect";
import SearchBar from "../../../molecules/SearchBar";
import styles from "./styles.module.scss";

interface UpperHeaderProps {
  locale: string;
}

const UpperHeader: FunctionComponent<UpperHeaderProps> = ({ locale }) => {
  return (
    <HeaderLevel className={styles.upper}>
      <Logo {...{ locale }} />
      <div className={styles.upperControls}>
        <SearchBar />
        <LanguageSelect />
      </div>
    </HeaderLevel>
  );
};

UpperHeader.displayName = "Organism.Header.Upper";

export default UpperHeader;
