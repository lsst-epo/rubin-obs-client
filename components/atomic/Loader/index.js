import CircularLoader from "@rubin-epo/epo-react-lib/CircularLoader";
import styles from "./styles.module.css";

function Loader(props) {
  return <CircularLoader className={styles.loader} {...props} />;
}

Loader.displayName = "Atomic.Loader";

export default Loader;
