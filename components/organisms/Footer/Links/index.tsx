import { FC } from "react";
import MixedLink from "@rubin-epo/epo-react-lib/MixedLink";
import styles from "./styles.module.css";
import { LinksFragmentFragment } from "@/gql/graphql";

interface LinksProps {
  links: Array<LinksFragmentFragment>;
}

const Links: FC<LinksProps> = ({ links }) => {
  return (
    <nav aria-label="Footer Links" className={styles.links}>
      <ul className={styles.list}>
        {links.map(({ mixedLink }, index) => {
          if (!mixedLink || !mixedLink?.url) return null;

          return (
            <li key={index} className={styles.item}>
              <MixedLink
                className={styles.link}
                url={mixedLink.url}
                text={mixedLink.text || undefined}
                customText={mixedLink.customText || undefined}
                title={mixedLink.title || undefined}
                element={(mixedLink.element as { uri: string }) || undefined}
                type={mixedLink.type || undefined}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Links.displayName = "Organism.Footer.Links";

export default Links;
