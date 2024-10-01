import "focus-visible";
import "@/styles/styles.scss";
import { FunctionComponent, PropsWithChildren } from "react";

const RootLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};

export default RootLayout;
