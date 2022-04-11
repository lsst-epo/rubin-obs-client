import Script from "next/script";
import { useShareButtons } from "@/lib/utils";
import PropTypes from "prop-types";
import styled from "styled-components";

// const SHARETHIS_PROPERTY = process.env.NEXT_PUBLIC_SHARETHIS_PROPERTY;
// Should be replaced with an env var
const SHARETHIS_PROPERTY = "5f57f7661db73a00129d7d03";

export const InlineShare = () => {
  useShareButtons();
  return <div className="sharethis-inline-share-buttons"></div>;
};

export const PopupShare = ({ title, url }) => {
  useShareButtons();
  if (!SHARETHIS_PROPERTY) return null;
  return (
    <>
      <Script
        src={`https://platform-api.sharethis.com/js/sharethis.js#property=${SHARETHIS_PROPERTY}&product=sop`}
        strategy="lazyOnload"
      />
      <StyledShare
        className="sharethis-inline-share-buttons"
        data-title={title}
        data-url={url}
      />
    </>
  );
};

const StyledShare = styled.div`
  display: inline-block !important;
  > div:not([data-network="sharethis"]) {
    display: none !important;
  }
  > [data-network="sharethis"] {
    background-color: transparent !important;
    &:before {
      position: absolute;
      display: block;
      content: url("data:image/svg+xml,%3Csvg width='1em' height='1em' fill='%239E9EA3' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m30 26.8c2.7 0 4.8 2.2 4.8 4.8s-2.1 5-4.8 5-4.8-2.3-4.8-5v-1.1l-11.8-6.8c-0.9 0.8-2.1 1.3-3.4 1.3-2.7 0-5-2.3-5-5s2.3-5 5-5c1.3 0 2.5 0.5 3.4 1.3l11.8-6.8c-0.1-0.4-0.2-0.8-0.2-1.1 0-2.8 2.3-5 5-5s5 2.2 5 5-2.3 5-5 5c-1.3 0-2.5-0.6-3.4-1.4l-11.8 6.8c0.1 0.4 0.2 0.8 0.2 1.2s-0.1 0.8-0.2 1.2l11.9 6.8c0.9-0.7 2.1-1.2 3.3-1.2z'/%3E%3C/svg%3E");
      top: 0;
      left: 10px;
    }
    img {
      opacity: 0;
    }
  }
`;

PopupShare.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
};
