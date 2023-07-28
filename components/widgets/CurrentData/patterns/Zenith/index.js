import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { formatAngle } from "@/helpers/formatters";
import * as Styled from "./styles";

const Zenith = ({ zenith = 0, isCondensed = false, className }) => {
  const { t } = useTranslation();
  const width = 52;
  const height = width;
  const clamped = Math.max(Math.min(zenith, 90), 0);
  const rotation = 90 - clamped;

  return (
    <Styled.Container className={className}>
      {!isCondensed && (
        <Styled.Label>
          {t("summit_dashboard.widgets.current.zenith")}
        </Styled.Label>
      )}
      <Styled.Compass
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        role="presentation"
      >
        <circle cx={width / 2} cy={height / 2} r={width / 2} fill="#000" />
        <g
          fill="#656969"
          stroke="#dce0e3"
          strokeMiterlimit="10"
          strokeWidth=".124"
          transform-origin={`${width / 2} ${height / 2 - 1.5}`}
          transform={`rotate(${rotation})`}
        >
          <path d="M21.629 12.737h8.716v1.134h-8.716z" />
          <path d="M37.881 17.598l.913-1.264-.278-1.256h-1.614l-.209-.8.12-2.623h1.7l-.306-2.072h-1.163v-.268h-1.727v.267h-3.386l-2.5-1.342h0l-.353-.612h-.993V5.966h-.309l-1.794-.407-1.794.407h-.309v1.663h-.993l-.353.612h0l-2.5 1.342h-3.386v-.268H14.92v.267h-1.156l-.306 2.072h1.7l.12 2.623-.209.8h-1.614l-.278 1.256.913 1.264.251.263.005-.02-1.112 4.249v4.967l1.507 4.286v2.788a14.479 14.479 0 0 0 22.486 0v-2.788l1.507-4.286v-4.967l-1.107-4.23zm.369-1.264l-.428 1.005-.238.345-.353-1.35zm-3.506-2.358l.193-.276-.09-.063.16-.228.141 1.67h-1.309l.816-1.166zm-.184-1.542v-.778h.195l.1.443-.725 1.035-.09-.063-.193.276.09.063-1.168 1.669h-1.545l-.88-1.208h-8.716l-.879 1.207h-1.542l-1.163-1.668.09-.063-.193-.276-.09.063-.725-1.035.1-.443h.195v.778zm-6.222 8.781l-.193.276.09.063-.145.207v-5.426h2.471l.535.714.1.276.082-.117-2.848 4.067zm-4.7 0l-.09.063-2.766-3.95.1-.276.535-.714h2.471v5.423l-.145-.207.09-.063zm-3.217-4.4l-.332-.474h.457zm11.136 0l-.125-.474h.457zm-14.587-3.4l.16.228-.09.063.193.276.09-.063.816 1.166H16.83zm-2.817 3.931l-.428-1.005h1.019l-.353 1.35zm11.836 17.666a10 10 0 0 1-10-10l.73-8.677h2.295l3.811 5.443-.09.063.193.276.09-.063.863 1.232v2.595h4.206v-2.595l.863-1.232.09.063.193-.276-.09-.063 3.811-5.443h2.295l.73 8.677a10 10 0 0 1-9.992 9.994z" />
        </g>
        <path
          fill="#474a4a"
          stroke="#6a6e6e"
          strokeMiterlimit="10"
          strokeWidth=".124"
          d="M43.817 37.576l-2.989-.006L30.36 27.059h8.815v-4.967H12.799v4.967h8.868l-10.493 10.45L6.88 37.5v.528h1.3v2.193l35.633.074v-2.193h1.3v-.528zm-19.256-.04l-9.346-.019 9.366-9.327zm2.857.006l.02-9.369 9.349 9.388z"
        />
      </Styled.Compass>
      <Styled.Unit>
        {isCondensed
          ? t("summit_dashboard.widgets.current.zenith", {
              context: "angle",
              angle: formatAngle(clamped),
            })
          : formatAngle(clamped)}
      </Styled.Unit>
    </Styled.Container>
  );
};

Zenith.displayName = "Widgets.Current.Zenith";

Zenith.propTypes = {
  zenith: PropTypes.number,
  isCondensed: PropTypes.bool,
  className: PropTypes.string,
};

export default Zenith;
