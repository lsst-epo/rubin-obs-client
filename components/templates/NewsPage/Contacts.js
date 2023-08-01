import PropTypes from "prop-types";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import * as Styled from "./styles";

export default function Contacts({ contacts }) {
  const { t } = useTranslation();
  const iconSize = 24;

  return (
    <>
      <Styled.ArticleHeading>{t(`news.contacts`)}</Styled.ArticleHeading>
      <div>
        {contacts.map((contact, i) => {
          const { name, affiliation, city, telephone, email } = contact;
          return (
            <Styled.ContactList key={`contact-${i}`}>
              {name && (
                <Styled.ContactListItem>
                  <Styled.IconWrapper className="name">
                    <Styled.ContactListItemIcon
                      icon="Account"
                      size={iconSize}
                    />
                  </Styled.IconWrapper>
                  <div className="c-content-rte">
                    <p>{name}</p>
                  </div>
                </Styled.ContactListItem>
              )}
              {affiliation && (
                <Styled.ContactListItem>
                  <Styled.IconWrapper className="affiliation">
                    <Styled.ContactListItemIcon icon="Globe" size={iconSize} />
                  </Styled.IconWrapper>
                  <div className="c-content-rte">
                    <p>{affiliation}</p>
                  </div>
                </Styled.ContactListItem>
              )}
              {city && (
                <Styled.ContactListItem>
                  <Styled.IconWrapper className="city">
                    <Styled.ContactListItemIcon icon="Team" size={iconSize} />
                  </Styled.IconWrapper>
                  <div className="c-content-rte">
                    <p>{city}</p>
                  </div>
                </Styled.ContactListItem>
              )}
              {telephone && (
                <Styled.ContactListItem>
                  <Styled.IconWrapper className="telephone">
                    <Styled.ContactListItemIcon icon="Phone" size={iconSize} />
                  </Styled.IconWrapper>
                  <div className="c-content-rte">
                    <a href={`tel:${telephone}`}>{telephone}</a>
                    <Link prefetch={false} href={`tel:${telephone}`}>
                      {telephone}
                    </Link>
                  </div>
                </Styled.ContactListItem>
              )}
              {email && (
                <Styled.ContactListItem>
                  <Styled.IconWrapper className="email">
                    <Styled.ContactListItemIcon icon="Mail" />
                  </Styled.IconWrapper>
                  <div className="c-content-rte">
                    <Link prefetch={false} href={`mailto:${email}`}>
                      {email}
                    </Link>
                  </div>
                </Styled.ContactListItem>
              )}
            </Styled.ContactList>
          );
        })}
      </div>
    </>
  );
}

Contacts.propTypes = {
  contacts: PropTypes.array,
};
