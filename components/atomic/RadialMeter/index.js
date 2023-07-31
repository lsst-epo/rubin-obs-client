import PropTypes from "prop-types";
import * as Styled from "./styles";
import { arrayRange } from "@/helpers";

const RadialMeter = ({ min, max, value, text, step = 1, labelledById }) => {
  const width = 100;
  const height = width;

  const baseRotation = 135;
  const range = arrayRange(min, max, step);
  const degreeStep = 270 / (range.length - 1);

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
      <defs>
        <path d="M25,80 A40,40 0 1 1 75,80" id="meterArc" />
      </defs>
      <circle
        cx={width / 2}
        cy={height / 2}
        r={width / 2}
        fill="#1f2121"
        stroke="#707070"
        strokeWidth="3"
      />
      <g stroke="#f5f5f5">
        <line
          x1={height / 2}
          x2={height / 2}
          y1={27}
          y2={width / 2}
          fill="none"
          strokeWidth="4"
          transform-origin={`${width / 2} ${height / 2}`}
          transform={`rotate(${value * degreeStep + baseRotation + 90})`}
        />
        <g fill="#c3c3c3" strokeWidth="2">
          <circle cx={width / 2} cy={height / 2} r="4" stroke="none" />
          <circle cx={width / 2} cy={height / 2} r="3" fill="none" />
        </g>
      </g>
      <g
        strokeWidth="2"
        stroke="#F5F5F5"
        strokeDasharray="6 24"
        strokeDashoffset="-24"
      >
        {range.map((v, i) => (
          <line
            key={v}
            x1={width / 2}
            x2={width / 2 + 30}
            y1={height / 2}
            y2={height / 2}
            transform-origin={`${width / 2} ${height / 2}`}
            transform={`rotate(${i * degreeStep + baseRotation})`}
          />
        ))}
      </g>
      <text dominantBaseline="central" stroke="#F5F5F5">
        <textPath href="#meterArc" textLength={197.323}>
          {range.map((v) => v)}
        </textPath>
      </text>
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
