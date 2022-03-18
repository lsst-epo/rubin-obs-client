export default function EducatorsMobileSvg({ image, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={217.438}
      height={220}
      {...props}
    >
      <defs>
        <pattern
          id="pattern"
          preserveAspectRatio="xMidYMid slice"
          width="100%"
          height="100%"
          viewBox="0 0 8192 8192"
        >
          {image && <image href={image.url} height="8192" width="8192" />}
        </pattern>
      </defs>
      <g data-name="Group 559866">
        <g data-name="Group 463772">
          <path
            data-name="Polygon 30"
            d="m108.852 94.23-54.426 31.41L0 94.23V31.41L54.426 0l54.426 31.41Z"
            fill="#fa6868"
          />
          <g data-name="Artwork 2">
            <g data-name="Group 463759" transform="rotate(-8 198.963 -172.39)">
              <rect
                data-name="Rectangle 3579"
                width={73.984}
                height={47.254}
                rx={1.973}
                transform="translate(2.559 5.057)"
                fill="#f5f5f5"
              />
              <path
                data-name="Line 8665"
                fill="none"
                stroke="#e1c79b"
                strokeMiterlimit={10}
                strokeWidth={4.739}
                d="M0 0h79.102"
              />
              <path
                data-name="Line 8666"
                fill="none"
                stroke="#e1c79b"
                strokeMiterlimit={10}
                strokeWidth={4.739}
                d="M0 57.588h79.102"
              />
              <path
                data-name="Line 8667"
                fill="none"
                stroke="#e1c79b"
                strokeLinecap="round"
                strokeMiterlimit={10}
                strokeWidth={4.739}
                d="m21.361 57.588-6.183 18.684"
              />
              <path
                data-name="Line 8668"
                fill="none"
                stroke="#e1c79b"
                strokeLinecap="round"
                strokeMiterlimit={10}
                strokeWidth={4.739}
                d="m57.767 57.667 6.157 18.605"
              />
              <g
                data-name="Group 463758"
                fill="none"
                stroke="#9e9fa2"
                strokeLinecap="round"
                strokeMiterlimit={10}
                strokeWidth={2.369}
              >
                <path data-name="Line 8669" d="M12.453 15.064h49.895" />
                <path data-name="Line 8670" d="M12.453 21.874h42.161" />
                <path data-name="Line 8671" d="M12.453 28.683h23.785" />
                <path data-name="Line 8672" d="M12.453 35.493h29.816" />
                <path data-name="Line 8673" d="M12.453 42.302h42.161" />
              </g>
            </g>
          </g>
        </g>
        <g data-name="Group 463741" transform="translate(57.437 60)">
          <circle data-name="Ellipse 4" cx={80} cy={80} r={80} fill="#fff" />
          <circle
            data-name="Artwork 5"
            cx={56}
            cy={56}
            r={56}
            transform="translate(24 24)"
            fill="url(#pattern)"
          />
        </g>
      </g>
    </svg>
  );
}
