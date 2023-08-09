import PropTypes from "prop-types";
import * as Styled from "./styles";
import { arrayRange } from "@/helpers";

const RadialMeter = ({ min, max, value, text, step = 1, labelledById }) => {
  const width = 100;
  const height = width;

  const baseRotation = -135;
  const range = arrayRange(min, max, step);
  const degreeStep = 270 / (range.length - 1);

  const centerX = width / 2;
  const centerY = height / 2;
  const origin = `${centerX} ${centerY}`;

  return (
    <Styled.Meter
      role="meter"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={text}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-labelledby={labelledById}
    >
      <circle
        cx={centerX}
        cy={centerY}
        r={width / 2}
        fill="#1f2121"
        stroke="#707070"
        strokeWidth="3"
      />
      <g stroke="#f5f5f5">
        <line
          x1={centerX}
          x2={centerX}
          y1={centerY - 20}
          y2={centerY}
          fill="none"
          strokeWidth="4"
          transform-origin={origin}
          style={{
            transform: `rotate(${value * degreeStep + baseRotation}deg)`,
          }}
        />
        <g fill="#c3c3c3" strokeWidth="2">
          <circle cx={centerX} cy={centerY} r="4" stroke="none" />
          <circle cx={centerX} cy={centerY} r="3" fill="none" />
        </g>
      </g>
      <g stroke="#F5F5F5">
        {range.map((v, i) => (
          <g
            transform-origin={origin}
            style={{
              transform: `rotate(${i * degreeStep + baseRotation}deg)`,
            }}
            key={v}
          >
            <text x={centerX} y={centerY} dy={-35} textAnchor="middle">
              {v}
            </text>
            <line
              x1={centerX}
              x2={centerX}
              y1={centerY - 30}
              y2={centerY}
              strokeDasharray="6 24"
              strokeWidth="2"
            />
          </g>
        ))}
      </g>
    </Styled.Meter>
  );
};

RadialMeter.displayName = "Atomic.RadialMeter";

RadialMeter.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  step: PropTypes.number,
  labelledById: PropTypes.string,
};

export default RadialMeter;

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="7"
  height="22.958"
  viewBox="0 0 7 22.958"
></svg>;
