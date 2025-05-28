import { FC } from "react";
import { type TFunction } from "i18next";
import {
  FaLinkedinIn,
  FaXTwitter,
  FaFacebookF,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa6";
import IconComposer from "@rubin-epo/epo-react-lib/IconComposer";
import ExternalLink from "@rubin-epo/epo-react-lib/ExternalLink";
import { useTranslation } from "@/lib/i18n";
import { capitalize } from "@/helpers";
import styles from "./styles.module.css";
import getSocials from "@/services/craft/globals/socials";

const hiddenText = (account: string, t: TFunction) => {
  if (account === "email") return t("social.email-rubin");
  return `${t("social.visit-rubin")} ${capitalize(account)}`;
};

const finalizedUrl = (account: string, url: string) => {
  if (account === "email") return `mailto:${url}`;
  return url;
};

interface ItemProps {
  account: string;
  url: string;
}

const icons: Record<string, JSX.Element> = {
  facebook: <FaFacebookF />,
  email: <IconComposer icon="ShareEmail" />,
  linkedIn: <FaLinkedinIn />,
  twitter: <FaXTwitter />,
  youTube: <FaYoutube />,
  instagram: <FaInstagram />,
};

const Item: FC<ItemProps> = async ({ account, url }) => {
  const { t } = await useTranslation();

  if (!account || !url) return null;

  const icon = icons[account];

  if (!icon) return null;

  const title = hiddenText(account, t);

  return (
    <li className={styles.item}>
      <ExternalLink
        href={finalizedUrl(account, url)}
        title={title}
        className={styles.link}
      >
        <span className="a-hidden">{title}</span>
        {icon}
      </ExternalLink>
    </li>
  );
};

const Social: FC = async () => {
  const socials = await getSocials();
  const { t } = await useTranslation();

  if (!socials) return null;

  return (
    <section data-cy="socials" className={styles.social}>
      <h3 className={styles.header}>{t("social.connect")}</h3>
      <ul className={styles.list}>
        {Object.keys(socials).map((account) => (
          <Item key={account} account={account} url={socials[account]} />
        ))}
      </ul>
    </section>
  );
};

Social.displayName = "Organism.Footer.Social";

export default Social;
