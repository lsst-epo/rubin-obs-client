import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import * as Styled from "./styles";

export default function Contacts({ contacts }) {
  const { t } = useTranslation();
  const iconSize = 24;

  return (
    <>
      <Styled.ArticleHeading>{t(`news.contacts`)}</Styled.ArticleHeading>
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
                      <Styled.ContactListItemIcon icon="Team" size={iconSize} />
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
    </>
  );
}

Contacts.propTypes = {
  contacts: PropTypes.array,
};
