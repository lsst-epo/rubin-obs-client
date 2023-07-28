import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { formatAngle } from "@/helpers/formatters";
import * as Styled from "./styles";

const Azimuth = ({ azimuth = 0, isCondensed = false, className }) => {
  const { t } = useTranslation();
  const width = 100;
  const height = width;
  return (
    <Styled.Container className={className}>
      {!isCondensed && (
        <Styled.Label>
          {t("summit_dashboard.widgets.current.azimuth")}
        </Styled.Label>
      )}
      <Styled.Compass
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        role="presentation"
      >
        <g stroke="#707070" strokeWidth="1">
          <circle cx={width / 2} cy={height / 2} r={width / 2} fill="#373b3b" />
          <line x1={width} y1={height / 2} y2={height / 2} />
          <line
            x1={width}
            y1={height / 2}
            y2={height / 2}
            transform-origin={`${width / 2} ${height / 2}`}
            transform="rotate(45)"
          />
          <line
            x1={width}
            y1={height / 2}
            y2={height / 2}
            transform-origin={`${width / 2} ${height / 2}`}
            transform="rotate(90)"
          />

          <line
            x1={width}
            y1={height / 2}
            y2={height / 2}
            transform-origin={`${width / 2} ${height / 2}`}
            transform="rotate(-45)"
          />
        </g>
        <g fill="#fff" fontSize="9">
          <text
            x={width / 2}
            dy="3"
            textAnchor="middle"
            dominantBaseline="hanging"
            aria-hidden="true"
          >
            {t("summit_dashboard.unit_localization.north", { context: "abbr" })}
          </text>
          <text
            x={width}
            y={height / 2}
            dx="-3"
            textAnchor="end"
            dominantBaseline="middle"
            aria-hidden="true"
          >
            {t("summit_dashboard.unit_localization.east", { context: "abbr" })}
          </text>
          <text
            x={width / 2}
            y={height}
            dy="-3"
            textAnchor="middle"
            aria-hidden="true"
          >
            {t("summit_dashboard.unit_localization.south", { context: "abbr" })}
          </text>
          <text
            x={0}
            y={height / 2}
            dx="3"
            textAnchor="start"
            dominantBaseline="middle"
            aria-hidden="true"
          >
            {t("summit_dashboard.unit_localization.west", { context: "abbr" })}
          </text>
        </g>

        <g stroke="#f5f5f5">
          <line
            x1={height / 2}
            x2={height / 2}
            y1={5}
            y2={width / 2}
            fill="none"
            strokeWidth="4"
            transform-origin={`${width / 2} ${height / 2}`}
            transform={`rotate(${azimuth})`}
          />
          <g fill="#c3c3c3" strokeWidth="2">
            <circle cx={width / 2} cy={height / 2} r="4" stroke="none" />
            <circle cx={width / 2} cy={height / 2} r="3" fill="none" />
          </g>
        </g>
      </Styled.Compass>
      <Styled.Unit>
        {isCondensed
          ? t("summit_dashboard.widgets.current.azimuth", {
              context: "angle",
              angle: formatAngle(azimuth),
            })
          : formatAngle(azimuth)}
      </Styled.Unit>
    </Styled.Container>
  );
};

Azimuth.displayName = "Widgets.Current.Azimuth";

Azimuth.propTypes = {
  azimuth: PropTypes.number,
  isCondensed: PropTypes.bool,
  className: PropTypes.string,
};

export default Azimuth;
