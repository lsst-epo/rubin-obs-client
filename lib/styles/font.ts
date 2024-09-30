// eslint-disable-next-line camelcase
import { Source_Sans_3 } from "next/font/google";

const SourceSansPro = Source_Sans_3({
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui"],
  variable: "--FONT_STACK_BASE",
});

export default SourceSansPro;
