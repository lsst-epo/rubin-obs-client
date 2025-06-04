import { FC } from "react";
import clsx from "clsx";
import { createLocationString } from "@/lib/helpers/location";
import styles from "./styles.module.css";

interface AddressProps {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  className?: string;
}

const Address: FC<AddressProps> = ({
  className,
  line1,
  line2,
  city,
  state,
  postalCode,
  country,
}) => {
  return (
    <address className={clsx(styles.address, className)}>
      {line1 ? line1 + "," : ""} {createLocationString(city, state, country)}
    </address>
  );
};

Address.displayName = "Atom.Address";

export default Address;
