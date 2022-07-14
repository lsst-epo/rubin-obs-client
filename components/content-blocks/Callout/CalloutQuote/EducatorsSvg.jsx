// eslint-disable-next-line react/prop-types
export default function EducatorsSvg({ image, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={254.5}
      height={402.5}
      {...props}
    >
      <defs>
        <pattern
          id="a"
          preserveAspectRatio="xMidYMid slice"
          width="100%"
          height="100%"
          viewBox="0 0 8192 8192"
        >
          {image && <image width="8192" height="8192" href={image.url} />}
        </pattern>
      </defs>
      <g data-name="Group 559863">
        <path
          data-name="Polygon 32"
          d="m201 174-100.5 58L0 174V58L100.5 0 201 58Z"
          fill="#fa6868"
        />
        <g data-name="Group 463805" transform="translate(-444.5 -1438.5)">
          <circle
            data-name="Ellipse 4"
            cx={124.5}
            cy={124.5}
            r={124.5}
            transform="translate(450 1592)"
            fill="#fff"
          />
          <circle
            data-name="Artwork 5"
            cx={61.5}
            cy={61.5}
            r={61.5}
            transform="translate(513 1655)"
            fill="url(#a)"
          />
        </g>
        <g data-name="Artwork 2">
          <g data-name="Group 463810" transform="rotate(-8 367.387 -318.323)">
            <rect
              data-name="Rectangle 3650"
              width={136.615}
              height={87.255}
              rx={3.643}
              transform="translate(4.725 9.337)"
              fill="#f5f5f5"
            />
            <path
              data-name="Line 8768"
              fill="none"
              stroke="#e1c79b"
              strokeMiterlimit={10}
              strokeWidth={8.75}
              d="M0 0h146.065"
            />
            <path
              data-name="Line 8769"
              fill="none"
              stroke="#e1c79b"
              strokeMiterlimit={10}
              strokeWidth={8.75}
              d="M0 106.338h146.065"
            />
            <path
              data-name="Line 8770"
              fill="none"
              stroke="#e1c79b"
              strokeLinecap="round"
              strokeMiterlimit={10}
              strokeWidth={8.75}
              d="m39.444 106.338-11.418 34.501"
            />
            <path
              data-name="Line 8771"
              fill="none"
              stroke="#e1c79b"
              strokeLinecap="round"
              strokeMiterlimit={10}
              strokeWidth={8.75}
              d="m106.67 106.484 11.369 34.354"
            />
            <g
              data-name="Group 463809"
              fill="none"
              stroke="#9e9fa2"
              strokeLinecap="round"
              strokeMiterlimit={10}
              strokeWidth={4.375}
            >
              <path data-name="Line 8772" d="M22.995 27.816h92.133" />
              <path data-name="Line 8773" d="M22.995 40.39h77.853" />
              <path data-name="Line 8774" d="M22.995 52.964h43.92" />
              <path data-name="Line 8775" d="M22.995 65.538h55.057" />
              <path data-name="Line 8776" d="M22.995 78.113h77.853" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
