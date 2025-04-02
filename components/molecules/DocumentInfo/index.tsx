import { FC } from "react";
import { SupportedCantoAssetScheme } from "@/lib/api/galleries/schema";
import { useTranslation } from "@/lib/i18n";
import styles from "./styles.module.css";

interface DocumentInfoProps {
  title: string;
  dateCreated: Date;
  scheme: SupportedCantoAssetScheme;
  locale: string;
}

const DocumentInfo: FC<DocumentInfoProps> = async ({
  title,
  dateCreated,
  scheme,
  locale,
}) => {
  const { t } = await useTranslation(locale);

  return (
    <>
      <div className={styles.scheme}>{t(`gallery.${scheme}`)}</div>
      <div className="t-heading-tertiary">{title}</div>
      <time className={styles.dateCreated} dateTime={dateCreated.toISOString()}>
        {new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(
          dateCreated
        )}
      </time>
    </>
  );
};

DocumentInfo.displayName = "Molecule.DocumentInfo";

export default DocumentInfo;
