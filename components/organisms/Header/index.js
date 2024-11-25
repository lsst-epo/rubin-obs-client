import PropTypes from "prop-types";
import CollapsibleHeader from "@/components/molecules/CollapsibleHeader";
import UpperHeader from "./Upper";
import LowerHeader from "./Lower";

export default function Header({ locale }) {
  return (
    <CollapsibleHeader>
      <UpperHeader {...{ locale }} />
      <LowerHeader {...{ locale }} />
    </CollapsibleHeader>
  );
}

Header.displayName = "Organism.Header";

Header.propTypes = {
  locale: PropTypes.string,
};
