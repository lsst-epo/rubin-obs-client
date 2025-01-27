import PropTypes from "prop-types";
import CollapsibleHeader from "@/components/molecules/CollapsibleHeader";
import UpperHeader from "./Upper";
import LowerHeader from "./Lower";
import { NavigationMenuProvider } from "@/contexts/NavigationMenu";

export default function Header({ locale }) {
  return (
    <NavigationMenuProvider>
      <CollapsibleHeader>
        <UpperHeader {...{ locale }} />
        <LowerHeader {...{ locale }} />
      </CollapsibleHeader>
    </NavigationMenuProvider>
  );
}

Header.displayName = "Organism.Header";

Header.propTypes = {
  locale: PropTypes.string,
};
