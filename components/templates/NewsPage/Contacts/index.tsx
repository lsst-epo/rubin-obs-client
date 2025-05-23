"use client";
import { FunctionComponent } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import IconComposer from "@rubin-epo/epo-react-lib/IconComposer";
import { ReleaseContact } from "@/services/noirlab";
import Stack from "@rubin-epo/epo-react-lib/Stack";
import RichTextContent from "@/components/atomic/RichTextContent";
import styles from "./styles.module.css";

interface ContactsProps {
  contacts: Array<ReleaseContact> | (string | undefined);
}

const Contacts: FunctionComponent<ContactsProps> = ({ contacts = [] }) => {
  const { t } = useTranslation();
  const iconSize = 24;

  return (
    <>
      <h3 className={styles.heading}>{t(`news.contacts`)}</h3>
      {Array.isArray(contacts) ? (
        <ul className={styles.contactList}>
          {contacts.map((contact) => {
            const { name, affiliation, city, telephone, email } = contact;
            return (
              <li key={name}>
                <address className={styles.contact}>
                  {name && (
                    <div className={styles.contactRow}>
                      <div className={clsx(styles.iconWrapper)}>
                        <IconComposer
                          className={styles.contactListItemIcon}
                          icon="Account"
                          size={iconSize}
                        />
                      </div>
                      <RichTextContent text={name} />
                    </div>
                  )}
                  {affiliation && (
                    <div className={styles.contactRow}>
                      <div className={clsx(styles.iconWrapper)}>
                        <IconComposer
                          className={styles.contactListItemIcon}
                          icon="Globe"
                          size={iconSize}
                        />
                      </div>
                      <RichTextContent text={affiliation} />
                    </div>
                  )}
                  {city && (
                    <div className={styles.contactRow}>
                      <div className={clsx(styles.iconWrapper)}>
                        <IconComposer
                          className={styles.contactListItemIcon}
                          icon="Team"
                          size={iconSize}
                        />
                      </div>
                      <RichTextContent text={city} />
                    </div>
                  )}
                  {telephone && (
                    <div className={styles.contactRow}>
                      <div
                        className={clsx(styles.iconWrapper, styles.telephone)}
                      >
                        <IconComposer
                          className={styles.contactListItemIcon}
                          icon="Phone"
                          size={iconSize}
                        />
                      </div>
                      <div className="c-content-rte">
                        <a href={`tel:${telephone}`}>{telephone}</a>
                        <a href={`tel:${telephone}`}>{telephone}</a>
                      </div>
                    </div>
                  )}
                  {email && (
                    <div className={styles.contactRow}>
                      <div className={clsx(styles.iconWrapper, styles.email)}>
                        <IconComposer
                          className={styles.contactListItemIcon}
                          icon="Mail"
                        />
                      </div>
                      <div className="c-content-rte">
                        <a href={`mailto:${email}`}>{email}</a>
                      </div>
                    </div>
                  )}
                </address>
              </li>
            );
          })}
        </ul>
      ) : (
        <Stack recursive>
          <RichTextContent text={contacts} />
        </Stack>
      )}
    </>
  );
};

export default Contacts;
