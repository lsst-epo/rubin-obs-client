import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Container from "@/layout/Container";
import MixedLink from "@/atomic/MixedLink";
import T from "@/page/Translate";
import { usePathData } from "@/lib/utils";
import { layoutGrid, respond } from "@/styles/globalStyles";

const Pagination = ({ limit, offset, page, total }) => {
  const { asPath } = usePathData();
  const currentPage = parseInt(page);
  const from = offset + 1;
  let to = offset + limit;
  to = to > total ? total : to;
  const numberOfPages = Math.ceil(total / limit) || 1;

  // Here is the collapsing logic for larger page numbers
  let pageArray;
  /* eslint-disable */
  if (numberOfPages > 10) {
    currentPage < 6
      ? (pageArray = new Array(8).fill(null).map((x, i) => i + 1))
      : (pageArray = new Array(8)
          .fill(null)
          .map((x, i) => currentPage - 4 + i));

    pageArray = pageArray.concat("...").concat(numberOfPages);
  } else {
    pageArray = new Array(numberOfPages).fill(null).map((x, i) => i + 1);
  }

  const prev = currentPage - 1;
  const next = currentPage < numberOfPages ? currentPage + 1 : 0;

  return (
    <StyledContainer width="regular">
      <NavDesktop>
        <div>
          <T i18nKey="pagination.showing-range">
            Showing {{ from }} to {{ to }} of {{ total }}
          </T>
        </div>
        <div>
          {pageArray.map((page, index) => {
            return currentPage !== page && page !== "..." ? (
              <React.Fragment key={index}>
                {index ? ` / ` : ``}
                <MixedLink url={asPath} params={{ page: page }}>
                  {page}
                </MixedLink>
              </React.Fragment>
            ) : (
              <React.Fragment key={index}>
                {index ? ` / ` : ``}
                {page}
              </React.Fragment>
            );
          })}
        </div>
        <div>
          {prev > 0 ? (
            <MixedLink url={asPath} params={{ page: prev }}>
              <T translate="pagination.previous" />
            </MixedLink>
          ) : (
            <T translate="pagination.previous" />
          )}
          &nbsp;&nbsp;
          {next > 0 ? (
            <MixedLink url={asPath} params={{ page: next }}>
              <T translate="pagination.next" />
            </MixedLink>
          ) : (
            <T translate="pagination.next" />
          )}
        </div>
      </NavDesktop>
      <NavMobile>
        <div>
          {prev > 0 ? (
            <MixedLink url={asPath} params={{ page: prev }}>
              &lt;&lt;
            </MixedLink>
          ) : (
            <>&lt;&lt;</>
          )}
        </div>
        <div>
          {next > 0 ? (
            <MixedLink url={asPath} params={{ page: next }}>
              &gt;&gt;
            </MixedLink>
          ) : (
            <>&gt;&gt;</>
          )}
        </div>
      </NavMobile>
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  a {
    color: var(--turquoise55);
    text-decoration: none;

    &:hover,
    &:focus-visible {
      color: var(--turquoise85);
    }
  }
`;

const NavDesktop = styled.nav`
  ${layoutGrid(3)}
  ${respond(`display: none;`)}
  > div:nth-child(2) {
    justify-self: center;
  }
  > div:nth-child(3) {
    justify-self: end;
    text-transform: uppercase;
  }
`;

const NavMobile = styled.nav`
  display: none;
  ${respond(`    
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr;

    >div:last-child {
      justify-self: end;
    }
`)}
`;

Pagination.propTypes = {
  limit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  offset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  total: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Pagination;
