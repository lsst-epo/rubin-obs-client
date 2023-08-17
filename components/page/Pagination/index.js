import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { MixedLink } from "@rubin-epo/epo-react-lib";
import T from "@/page/Translate";
import { usePathData } from "@/lib/utils";
import * as Styled from "./styles";

const Pagination = ({ limit, offset, page, total }) => {
  const { t } = useTranslation();
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
    <Styled.PaginationContainer width="regular">
      <Styled.NavDesktop aria-label={t("pagination.label")}>
        <div>
          <T i18nKey="pagination.showing-range">
            Showing {{ from }} to {{ to }} of {{ length: total }}
          </T>
        </div>
        <div>
          <Styled.PaginationList>
            {pageArray.map((page, index) => {
              return currentPage !== page && page !== "..." ? (
                <React.Fragment key={index}>
                  <li>
                    <MixedLink url={asPath} params={{ page: page }}>
                      {page}
                    </MixedLink>
                  </li>
                </React.Fragment>
              ) : (
                <React.Fragment key={index}>
                  <li>{page}</li>
                </React.Fragment>
              );
            })}
          </Styled.PaginationList>
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
      </Styled.NavDesktop>
      <Styled.NavMobile aria-label={t("pagination.label")}>
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
      </Styled.NavMobile>
    </Styled.PaginationContainer>
  );
};

Pagination.propTypes = {
  limit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  offset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  total: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Pagination;
