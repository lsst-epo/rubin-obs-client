import PropTypes from "prop-types";
import styled from "styled-components";
import { Container } from "@rubin-epo/epo-react-lib";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { createLocationString } from "@/lib/utils";

export default function ContactStaff({ header, staffEntry }) {
  const { t } = useTranslation();

  return (
    <StyledContainer>
      {header && <Header>{header}</Header>}
      {staffEntry.length > 0 &&
        staffEntry.map((staff, i) => (
          <Main key={i}>
            {staff.title && <h3>{staff.title}</h3>}
            {staff.plainText && <h5>{staff.plainText}</h5>}
            {Array.isArray(staff.subLocation) &&
              staff.subLocation.map((loc, i) => (
                <Info key={i}>
                  <div>{loc.title}</div>
                  <div>
                    {createLocationString(
                      loc.city,
                      loc.state,
                      loc.country,
                      loc.address,
                      true
                    )}
                  </div>
                </Info>
              ))}
            {staff?.phoneNumber?.number && (
              <div>{t(`cell`) + ": " + staff.phoneNumber.number}</div>
            )}
            {staff.email && (
              <div>
                {t(`email`)}
                {`: `}
                <Link prefetch={false} href={`mailto:${staff.email}`}>
                  {staff.email}
                </Link>
              </div>
            )}
          </Main>
        ))}
    </StyledContainer>
  );
}

const StyledContainer = styled(Container)`
  > div > * + * {
    margin-top: 46px;
  }
`;

const Header = styled.h2`
  @include base.fluid-scale(margin-bottom, 100px, 60px);
  padding-bottom: 10px;
  margin-bottom: 30px;
  border-bottom: 10px solid var(--neutral40);
`;

const Main = styled.div`
  background-color: var(--neutral10);
  padding: 1.5rem;
`;

const Info = styled.div`
  margin-top: 1rem;
`;
ContactStaff.displayName = "ContentBlock.ContactStaff";

ContactStaff.propTypes = {
  header: PropTypes.string,
  staffEntry: PropTypes.array,
};
