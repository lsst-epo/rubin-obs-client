import { FC, PropsWithChildren } from "react";
import classNames from "classnames";
import Container, {
  type ContainerProps,
} from "@rubin-epo/epo-react-lib/Container";
import Search from "@/components/molecules/Search";
import ClearFiltersButton from "@/components/molecules/ClearFiltersButton";
import styles from "./styles.module.css";

interface FiltersProps {
  className?: string;
  hasSearch?: boolean;
  width?: ContainerProps["width"];
  onFiltersCleared?: () => void;
}

const Filters: FC<PropsWithChildren<FiltersProps>> = ({
  hasSearch = true,
  className,
  width,
  onFiltersCleared,
  children,
}) => {
  return (
    <div className={classNames(styles.filters, className)}>
      <Container
        bgColor="none"
        paddingSize="none"
        width={width}
        className={styles.layout}
      >
        <div className={styles.left}>{children}</div>
        <div className={styles.right}>
          {hasSearch && <Search className={styles.search} />}
          <ClearFiltersButton {...{ onFiltersCleared }} />
        </div>
      </Container>
    </div>
  );
};

Filters.displayName = "Organism.Filters";

export default Filters;
