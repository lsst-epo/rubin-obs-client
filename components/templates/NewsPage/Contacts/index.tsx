import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { ReleaseContact } from "@/lib/api/noirlab/codegen";
import Stack from "@rubin-epo/epo-react-lib/Stack";
import * as Styled from "../styles";

interface ContactsProps {
  contacts: Array<ReleaseContact> | (string | undefined);
}

const Contacts: FunctionComponent<ContactsProps> = ({ contacts = [] }) => {
  const { t } = useTranslation();
  const iconSize = 24;

  return (
    <>
      <Styled.ArticleHeading>{t(`news.contacts`)}</Styled.ArticleHeading>
      {Array.isArray(contacts) ? (
        <Styled.ContactList>
          {contacts.map((contact, i) => {
            const { name, affiliation, city, telephone, email } = contact;
            return (
              <li key={name}>
                <Styled.Contact>
                  {name && (
                    <Styled.ContactRow>
                      <Styled.IconWrapper className="name">
                        <Styled.ContactListItemIcon
                          icon="Account"
                          size={iconSize}
                        />
                      </Styled.IconWrapper>
                      <div className="c-content-rte">{name}</div>
                    </Styled.ContactRow>
                  )}
                  {affiliation && (
                    <Styled.ContactRow>
                      <Styled.IconWrapper className="affiliation">
                        <Styled.ContactListItemIcon
                          icon="Globe"
                          size={iconSize}
                        />
                      </Styled.IconWrapper>
                      <div className="c-content-rte">{affiliation}</div>
                    </Styled.ContactRow>
                  )}
                  {city && (
                    <Styled.ContactRow>
                      <Styled.IconWrapper className="city">
                        <Styled.ContactListItemIcon
                          icon="Team"
                          size={iconSize}
                        />
                      </Styled.IconWrapper>
                      <div className="c-content-rte">{city}</div>
                    </Styled.ContactRow>
                  )}
                  {telephone && (
                    <Styled.ContactRow>
                      <Styled.IconWrapper className="telephone">
                        <Styled.ContactListItemIcon
                          icon="Phone"
                          size={iconSize}
                        />
                      </Styled.IconWrapper>
                      <div className="c-content-rte">
                        <a href={`tel:${telephone}`}>{telephone}</a>
                        <a href={`tel:${telephone}`}>{telephone}</a>
                      </div>
                    </Styled.ContactRow>
                  )}
                  {email && (
                    <Styled.ContactRow>
                      <Styled.IconWrapper className="email">
                        <Styled.ContactListItemIcon icon="Mail" />
                      </Styled.IconWrapper>
                      <div className="c-content-rte">
                        <a href={`mailto:${email}`}>{email}</a>
                      </div>
                    </Styled.ContactRow>
                  )}
                </Styled.Contact>
              </li>
            );
          })}
        </Styled.ContactList>
      ) : (
        <Stack recursive>
          <div dangerouslySetInnerHTML={{ __html: contacts }} />
        </Stack>
      )}
    </>
  );
};

export default Contacts;
