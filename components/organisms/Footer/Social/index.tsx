import { FC } from "react";
import clsx from "clsx";
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

  return (
    <li className={styles.item}>
      <ExternalLink href={finalizedUrl(account, url)} className={styles.link}>
        <span className="a-hidden">{hiddenText(account, t)}</span>
        {icon}
      </ExternalLink>
    </li>
  );
};

interface SocialProps {
  socialInfo: any;
  className?: string;
}

const Social: FC<SocialProps> = async ({ socialInfo, className }) => {
  const { t } = await useTranslation();
  return (
    <section className={clsx(styles.social, className)}>
      <h3 className={styles.header}>{t("social.connect")}</h3>
      <ul className={styles.list}>
        {Object.keys(socialInfo).map((account) => (
          <Item key={account} account={account} url={socialInfo[account]} />
        ))}
      </ul>
    </section>
  );
};

Social.displayName = "Organism.Footer.Social";

export default Social;
