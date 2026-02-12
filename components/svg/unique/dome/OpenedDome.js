import defaultProps from "../defaultProps";
import svgShape from "@/shapes/svg";

const OpenedDome = ({ width = 69.716, height = 70 }) => {
  const uniqueProps = {
    viewBox: "0 0 69.716 70",
    width: "100%",
    height: "auto",
  };

  const mergedSvgProps = { ...defaultProps, ...uniqueProps };
  return (
    <svg {...mergedSvgProps}>
      <defs>
        <clipPath id="clipPath">
          <rect
            id="Rectangle_9603"
            data-name="Rectangle 9603"
            width="69.715"
            height="70"
            fill="none"
          />
        </clipPath>
        <clipPath id="clipPath-2">
          <path
            id="Path_1190870"
            data-name="Path 1190870"
            d="M5.63,50.193C-5.882,57.742,1.841,70,34.425,70S75.549,57.742,64.541,50.193C58.3,45.914,46.145,43.6,35.3,43.6s-23.15,2.31-29.674,6.589"
            fill="none"
          />
        </clipPath>
        <linearGradient
          id="linear-gradient"
          x1="0.072"
          y1="1"
          x2="0.085"
          y2="1"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#686868" />
          <stop offset="0.055" stopColor="#686868" />
          <stop offset="0.439" stopColor="#909090" />
          <stop offset="0.617" stopColor="#aaa" />
          <stop offset="0.733" stopColor="#909090" />
          <stop offset="0.929" stopColor="#686868" />
          <stop offset="1" stopColor="#414141" />
        </linearGradient>
        <clipPath id="clipPath-3">
          <rect
            id="Rectangle_9606"
            data-name="Rectangle 9606"
            width="68.482"
            height="6.242"
            transform="translate(0.605 51.149)"
            fill="none"
          />
        </clipPath>
        <linearGradient
          id="linear-gradient-2"
          x1="-0.009"
          y1="3.02"
          x2="0.006"
          y2="3.02"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#636669" />
          <stop offset="0.055" stopColor="#636669" />
          <stop offset="0.439" stopColor="#898e91" />
          <stop offset="0.617" stopColor="#a1a8ab" />
          <stop offset="0.733" stopColor="#898e91" />
          <stop offset="0.929" stopColor="#636669" />
          <stop offset="1" stopColor="#3e4142" />
        </linearGradient>
        <clipPath id="clipPath-4">
          <path
            id="Path_1190871"
            data-name="Path 1190871"
            d="M3.181,46.534c-8.232,7.608,3.673,17.3,31.3,17.3s40.118-9.693,32.347-17.3c-5.17-5.062-18.69-8.071-31.577-8.071S8.658,41.472,3.181,46.534"
            fill="none"
          />
        </clipPath>
        <radialGradient
          id="radial-gradient"
          cx="0.501"
          cy="0.5"
          r="1.018"
          gradientTransform="matrix(0.319, 0, 0, -0.4, 0.043, 1.74)"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#0f3849" />
          <stop offset="0.55" stopColor="#0f3849" />
          <stop offset="0.911" stopColor="#13525e" />
          <stop offset="1" stopColor="#13525e" />
        </radialGradient>
        <clipPath id="clipPath-5">
          <rect
            id="Rectangle_9609"
            data-name="Rectangle 9609"
            width="36.009"
            height="4.849"
            transform="translate(16.635 46.321)"
            fill="none"
          />
        </clipPath>
        <linearGradient
          id="linear-gradient-3"
          x1="-0.462"
          y1="4.883"
          x2="-0.434"
          y2="4.883"
          xlinkHref="#linear-gradient-2"
        />
        <clipPath id="clipPath-6">
          <path
            id="Path_1190872"
            data-name="Path 1190872"
            d="M16.635,51.17c-.162,4.355,7.959,7.973,18.143,7.973s18.174-3.618,17.854-7.973c-.312-4.242-8.429-7.6-18.138-7.6s-17.7,3.357-17.859,7.6"
            fill="none"
          />
        </clipPath>
        <linearGradient
          id="linear-gradient-4"
          x1="-0.452"
          y1="1.697"
          x2="-0.424"
          y2="1.697"
          xlinkHref="#linear-gradient-2"
        />
        <clipPath id="clipPath-7">
          <path
            id="Path_1190873"
            data-name="Path 1190873"
            d="M16.646,46.321c-.162,4.355,7.959,7.972,18.143,7.972s18.174-3.617,17.855-7.972c-.312-4.242-8.428-7.6-18.136-7.6s-17.7,3.358-17.862,7.6"
            fill="none"
          />
        </clipPath>
        <radialGradient
          id="radial-gradient-2"
          cx="0.498"
          cy="0.5"
          r="0.891"
          gradientTransform="matrix(0.427, 0, 0, -0.4, -0.259, 2.812)"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#545659" />
          <stop offset="0.086" stopColor="#545659" />
          <stop offset="0.463" stopColor="#636669" />
          <stop offset="1" stopColor="#898e91" />
        </radialGradient>
        <clipPath id="clipPath-8">
          <path
            id="Path_1190874"
            data-name="Path 1190874"
            d="M23.565,39.346c1.156,0,3.034-1.212,3.219-5.8l-6.455-.755c0,5.209,2.017,6.553,3.236,6.553"
            fill="none"
          />
        </clipPath>
        <linearGradient
          id="linear-gradient-5"
          x1="-3.149"
          y1="5.678"
          x2="-2.994"
          y2="5.678"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#282825" />
          <stop offset="0.12" stopColor="#282825" />
          <stop offset="0.881" stopColor="#30302c" />
          <stop offset="1" stopColor="#30302c" />
        </linearGradient>
        <clipPath id="clipPath-9">
          <path
            id="Path_1190875"
            data-name="Path 1190875"
            d="M19.017,35.882l-.328.73c-1.131,3.276-2.119,4.591-3.4,10.177l.009.994,1.012.361.117-1.2,3.241-10.335.437-.73Z"
            fill="none"
          />
        </clipPath>
        <linearGradient
          id="linear-gradient-6"
          x1="-1.268"
          y1="2.638"
          x2="-1.168"
          y2="2.638"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#8fa2b0" />
          <stop offset="0.135" stopColor="#8fa2b0" />
          <stop offset="0.629" stopColor="#91a3b1" />
          <stop offset="1" stopColor="#91a3b1" />
        </linearGradient>
        <clipPath id="clipPath-10">
          <path
            id="Path_1190876"
            data-name="Path 1190876"
            d="M19.668,36.612,16.427,46.947l-.117,1.2,2.481-2.335-.146-1.752L20.6,37.576l-.5-1.694Z"
            fill="none"
          />
        </clipPath>
        <linearGradient
          id="linear-gradient-7"
          x1="-1.433"
          y1="2.681"
          x2="-1.329"
          y2="2.681"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#4f4f49" />
          <stop offset="0.12" stopColor="#4f4f49" />
          <stop offset="0.881" stopColor="#30302c" />
          <stop offset="1" stopColor="#30302c" />
        </linearGradient>
        <clipPath id="clipPath-11">
          <path
            id="Path_1190877"
            data-name="Path 1190877"
            d="M14.846,45.882l-.274.689.726,1.212-.009-.994c.347-1.508.671-2.706.983-3.714Z"
            fill="none"
          />
        </clipPath>
        <linearGradient
          id="linear-gradient-8"
          x1="-3.868"
          y1="5.439"
          x2="-3.585"
          y2="5.439"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#7a8894" />
          <stop offset="0.141" stopColor="#7a8894" />
          <stop offset="0.468" stopColor="#a1b4c4" />
          <stop offset="0.888" stopColor="#cae3f7" />
          <stop offset="1" stopColor="#cae3f7" />
        </linearGradient>
        <clipPath id="clipPath-12">
          <path
            id="Path_1190878"
            data-name="Path 1190878"
            d="M19.616,32.793c0,5.209,2.016,6.553,3.234,6.553h.661c-1.223-.039-3.182-1.418-3.182-6.552Z"
            fill="none"
          />
        </clipPath>
        <linearGradient
          id="linear-gradient-9"
          x1="-5.036"
          y1="5.678"
          x2="-4.779"
          y2="5.678"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#42423c" />
          <stop offset="0.125" stopColor="#42423c" />
          <stop offset="0.881" stopColor="#30302c" />
          <stop offset="1" stopColor="#30302c" />
        </linearGradient>
        <clipPath id="clipPath-13">
          <path
            id="Path_1190879"
            data-name="Path 1190879"
            d="M42.046,33.548c.186,4.586,2.063,5.8,3.22,5.8,1.219,0,3.235-1.344,3.235-6.553Z"
            fill="none"
          />
        </clipPath>
        <linearGradient
          id="linear-gradient-10"
          x1="-6.514"
          y1="5.678"
          x2="-6.359"
          y2="5.678"
          xlinkHref="#linear-gradient-5"
        />
        <clipPath id="clipPath-14">
          <path
            id="Path_1190880"
            data-name="Path 1190880"
            d="M48.726,35.882l.437.73L52.4,46.947l.117,1.2,1.012-.361.008-.994c-1.281-5.586-2.269-6.9-3.4-10.177l-.329-.73Z"
            fill="none"
          />
        </clipPath>
        <linearGradient
          id="linear-gradient-11"
          x1="-3.407"
          y1="3.296"
          x2="-3.331"
          y2="3.296"
          xlinkHref="#linear-gradient-6"
        />
        <clipPath id="clipPath-15">
          <path
            id="Path_1190881"
            data-name="Path 1190881"
            d="M48.229,37.576l1.957,6.481-.147,1.752,2.482,2.335-.117-1.2L49.163,36.612l-.437-.73Z"
            fill="none"
          />
        </clipPath>
        <linearGradient
          id="linear-gradient-12"
          x1="-3.423"
          y1="3.434"
          x2="-3.345"
          y2="3.434"
          xlinkHref="#linear-gradient-7"
        />
        <clipPath id="clipPath-16">
          <path
            id="Path_1190882"
            data-name="Path 1190882"
            d="M53.541,46.789l-.008.994.726-1.212-.273-.689-1.427-2.807c.311,1.008.636,2.206.982,3.714"
            fill="none"
          />
        </clipPath>
        <linearGradient
          id="linear-gradient-13"
          x1="-10.213"
          y1="7.474"
          x2="-10.013"
          y2="7.474"
          xlinkHref="#linear-gradient-8"
        />
        <clipPath id="clipPath-17">
          <path
            id="Path_1190883"
            data-name="Path 1190883"
            d="M48.5,32.793c0,5.134-1.957,6.513-3.181,6.552h.661c1.218,0,3.235-1.344,3.235-6.553Z"
            fill="none"
          />
        </clipPath>
        <linearGradient
          id="linear-gradient-14"
          x1="-11.632"
          y1="5.678"
          x2="-11.376"
          y2="5.678"
          xlinkHref="#linear-gradient-9"
        />
        <clipPath id="clipPath-19">
          <path
            id="Path_1190885"
            data-name="Path 1190885"
            d="M37.808,25.206v.2h-.563v.27h-.1V25.4h-.564v.27h-.1V25.4h-.564v-.2h-3v.2h-.563v.27h-.1V25.4h-.565v.27h-.1V25.4h-.563v-.2H27.815l-.37,6.286H41.387l-.372-6.286Z"
            fill="none"
          />
        </clipPath>
        <linearGradient
          id="linear-gradient-15"
          x1="-1.969"
          y1="7.126"
          x2="-1.897"
          y2="7.126"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#29a4a9" />
          <stop offset="0.081" stopColor="#29a4a9" />
          <stop offset="0.983" stopColor="#2b9cb5" />
          <stop offset="1" stopColor="#2b9cb5" />
        </linearGradient>
        <clipPath id="clipPath-21">
          <path
            id="Path_1190888"
            data-name="Path 1190888"
            d="M23.434,37.407l2.8-.283.373-4.216-2.6-.326Z"
            fill="none"
          />
        </clipPath>
        <linearGradient
          id="linear-gradient-16"
          x1="-7.381"
          y1="7.755"
          x2="-7.066"
          y2="7.755"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#136e67" />
          <stop offset="0.177" stopColor="#136e67" />
          <stop offset="0.806" stopColor="#0e524d" />
          <stop offset="1" stopColor="#0e524d" />
        </linearGradient>
        <clipPath id="clipPath-23">
          <path
            id="Path_1190971"
            data-name="Path 1190971"
            d="M42.222,32.908l.373,4.216,2.8.283-.578-4.825Z"
            fill="none"
          />
        </clipPath>
        <linearGradient
          id="linear-gradient-17"
          x1="-8.612"
          y1="6.668"
          x2="-8.404"
          y2="6.668"
          xlinkHref="#linear-gradient-16"
        />
        <clipPath id="clipPath-25">
          <path
            id="Path_1190975"
            data-name="Path 1190975"
            d="M27.355,25.273l-.069.011h0l-.033.006h0a.2.2,0,0,0-.035.006l-.038.006h-.006l-.03.006h-.01l-.032.006-.006,0a.279.279,0,0,0-.038.007h-.009l-.03.006-.012,0a.155.155,0,0,0-.031.006l-.009,0-.041.007-.009,0-.032.006-.014,0-.03.006-.013,0-.042.008-.01,0-.034.007-.015,0-.031.006-.014,0-.045.01-.011,0-.037.008-.016,0-.038.009-.009,0-.049.011-.014,0-.037.008-.016,0-.047.011-.006,0-.047.01-.016,0-.039.009-.014,0-.052.011-.011,0-.042.011-.017,0-.044.011-.01,0L26,25.554l-.015,0-.042.011-.015,0-.056.015h0l-.052.013-.016.005-.044.011-.015,0-.056.015-.013,0-.046.012-.017,0-.05.014-.008,0-.058.016-.016.005-.046.013-.015,0-.06.017-.007,0-.053.016-.017.005c-.016,0-.033.009-.049.015l-.013,0-.06.019-.014,0-.049.015-.017.006c-.019.006-.038.011-.056.018h-.006l-.061.02-.017.006-.048.015-.016,0-.062.021-.009,0-.053.018-.019.006-.051.017-.012,0-.082.028-.014.005-.081.029-.013.005-.082.03-.013,0-.083.032-.007,0-.088.033h0l-.087.034-.011,0-.083.034-.013,0-.082.034-.013.006-.084.034-.011.005-.086.037,0,0-.087.038-.006,0-.085.037-.013.007c-.027.011-.055.024-.082.038l-.014.006-.081.038-.014.007-.082.039-.01.005-.087.043a39.669,39.669,0,0,0-.567,6.008h1.408l3.433-1.09.37-6.286s-.17.019-.46.067m14.032,6.219,3.432,1.09h1.408a39.808,39.808,0,0,0-.567-6.008l-.087-.043-.01-.005-.082-.039-.014-.007-.081-.038-.014-.006c-.028-.014-.055-.027-.082-.038l-.013-.007-.084-.037-.007,0-.087-.038,0,0-.086-.037L45,26.269l-.082-.034-.014-.006-.082-.034-.013,0-.084-.034-.01,0-.086-.034h0l-.087-.033-.008,0-.083-.032-.013,0-.082-.03-.013-.005-.081-.029-.014-.005-.082-.028-.012,0-.051-.018-.019-.006-.053-.018-.009,0-.062-.021-.016,0a.4.4,0,0,0-.049-.015l-.016-.006-.062-.02h0l-.057-.018-.018-.006-.048-.015-.014,0-.061-.019-.012,0c-.016-.006-.033-.01-.049-.015l-.017-.005-.053-.016-.007,0-.06-.017-.015,0-.046-.013-.016-.005-.058-.016-.008,0-.051-.014-.016,0-.047-.012-.012,0-.056-.015-.015,0-.044-.011-.016-.005-.052-.013h0l-.056-.015-.015,0-.042-.011-.015,0-.054-.013-.009,0-.045-.011-.017,0-.042-.011-.011,0L42.6,25.5l-.014,0-.039-.009-.015,0-.048-.01,0,0-.048-.011-.016,0-.037-.008-.014,0-.048-.011-.01,0-.038-.008-.016,0-.037-.008-.011,0-.045-.01-.015,0-.03-.006-.016,0-.033-.007-.01,0-.042-.008-.013,0-.03-.006-.013,0-.033-.006-.009,0-.04-.007-.01,0a.155.155,0,0,0-.031-.006l-.012,0-.03-.006H41.78a.253.253,0,0,0-.038-.007l-.006,0-.032-.006h-.01l-.03-.006h-.006L41.62,25.3a.2.2,0,0,0-.035-.006h0l-.032-.006h0l-.069-.011c-.291-.048-.461-.067-.461-.067Z"
            fill="none"
          />
        </clipPath>
        <linearGradient
          id="linear-gradient-18"
          x1="-0.914"
          y1="4.531"
          x2="-0.873"
          y2="4.531"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#80cede" />
          <stop offset="0.034" stopColor="#80cede" />
          <stop offset="0.171" stopColor="#6cbbcc" />
          <stop offset="0.745" stopColor="#2c8da3" />
          <stop offset="0.869" stopColor="#2b9cb5" />
          <stop offset="1" stopColor="#6cbbcc" />
        </linearGradient>
        <clipPath id="clipPath-27">
          <path
            id="Path_1191011"
            data-name="Path 1191011"
            d="M25.963,20.608,25.8,21.3l1.119.651a11.371,11.371,0,0,1,1.311-.6l-.493-.618c-.334-.42.707-.865,1.022-.489l.6.709a16.635,16.635,0,0,1,10.131,0l.6-.709c.315-.376,1.356.069,1.022.489l-.493.618a11.371,11.371,0,0,1,1.311.6l1.119-.651-.167-.695a19.429,19.429,0,0,0-16.905,0"
            fill="none"
          />
        </clipPath>
        <linearGradient
          id="linear-gradient-19"
          x1="-1.496"
          y1="15.644"
          x2="-1.438"
          y2="15.644"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#183638" />
          <stop offset="0.126" stopColor="#183638" />
          <stop offset="0.553" stopColor="#12454d" />
          <stop offset="1" stopColor="#162e2d" />
        </linearGradient>
        <clipPath id="clipPath-29">
          <path
            id="Path_1191014"
            data-name="Path 1191014"
            d="M26.762,17.3l.987.667c.66-.551,2.48-1.67,6.666-1.67s6.007,1.119,6.667,1.67l.988-.667s-1.962-2.175-7.655-2.175S26.762,17.3,26.762,17.3"
            fill="none"
          />
        </clipPath>
        <linearGradient
          id="linear-gradient-20"
          x1="-1.748"
          y1="19.308"
          x2="-1.683"
          y2="19.308"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#041413" />
          <stop offset="0.007" stopColor="#041413" />
          <stop offset="0.122" stopColor="#0b3e3b" />
          <stop offset="0.538" stopColor="#136e67" />
          <stop offset="1" stopColor="#0d3136" />
        </linearGradient>
        <clipPath id="clipPath-31">
          <path
            id="Path_1191020"
            data-name="Path 1191020"
            d="M40.076,20.243l-.6.709L36,25.1h1.619L40.6,21.35l.493-.618c.246-.309-.252-.631-.658-.631a.461.461,0,0,0-.364.142m2.017-2.4-.424.5-.267.319-.635.756.084.029.045.016.055.019.064.022c.018.008.037.014.055.02l.047.017c.016.007.032.012.048.018l.073.027.039.015.05.019.032.011.088.034.026.01.17.066.014.006.17.069L42.479,19l-.294-1.218Z"
            fill="none"
          />
        </clipPath>
        <linearGradient
          id="linear-gradient-21"
          x1="-3.517"
          y1="5.517"
          x2="-3.415"
          y2="5.517"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#50b3ba" />
          <stop offset="0.122" stopColor="#50b3ba" />
          <stop offset="0.593" stopColor="#12635e" />
          <stop offset="0.82" stopColor="#136b64" />
          <stop offset="1" stopColor="#438f8c" />
        </linearGradient>
        <clipPath id="clipPath-32">
          <path
            id="Path_1191021"
            data-name="Path 1191021"
            d="M27.1,15.885,26.762,17.3s1.961-2.175,7.653-2.175S42.07,17.3,42.07,17.3l-.343-1.418c-.793-.6-2.963-1.923-7.312-1.923S27.9,15.285,27.1,15.885"
            fill="none"
          />
        </clipPath>
        <linearGradient
          id="linear-gradient-22"
          x1="-1.748"
          y1="16.773"
          x2="-1.683"
          y2="16.773"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#136e67" />
          <stop offset="0.567" stopColor="#177a74" />
          <stop offset="0.895" stopColor="#12645f" />
          <stop offset="1" stopColor="#12645f" />
        </linearGradient>
        <clipPath id="clipPath-34">
          <path
            id="Path_1191025"
            data-name="Path 1191025"
            d="M27.733,20.732l.493.618L31.209,25.1h1.619L29.35,20.952l-.6-.709a.459.459,0,0,0-.364-.142c-.406,0-.9.322-.658.631M26.352,19l.652.819.171-.069.013-.006.17-.066.026-.01.088-.034.032-.011.049-.019.04-.015.073-.027.049-.018.046-.017c.018-.006.036-.012.054-.02l.065-.022.055-.019.045-.016.084-.029-.37-.441-.532-.634-.424-.5-.092-.059Z"
            fill="none"
          />
        </clipPath>
        <linearGradient
          id="linear-gradient-23"
          x1="-2.562"
          y1="5.464"
          x2="-2.458"
          y2="5.464"
          xlinkHref="#linear-gradient-21"
        />
        <clipPath id="clipPath-36">
          <path
            id="Path_1191027"
            data-name="Path 1191027"
            d="M26.773,24.025,26.68,25.4l.009,0,.031-.006.015,0,.034-.007.01,0,.042-.008.013,0,.03-.006.014,0,.032-.006.009,0,.041-.007.009,0A.155.155,0,0,1,27,25.336l.012,0,.03-.006h.009a.279.279,0,0,1,.038-.007l.006,0,.032-.006h.01l.03-.006h.006l.038-.006a.2.2,0,0,1,.035-.006h0l.033-.006h0l.069-.011.09-1.65Zm.142-2.071-.09,1.309.62.36.106-1.983c-.412.187-.636.314-.636.314m.247-3.61.532.634c.009-.165.019-.343.028-.5l-.546-.353Zm.031-.47.542.35c.008-.152.014-.254.014-.254l-.537-.363Z"
            fill="none"
          />
        </clipPath>
        <linearGradient
          id="linear-gradient-24"
          x1="-3.04"
          y1="13.706"
          x2="-2.91"
          y2="13.706"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#12635e" />
          <stop offset="1" />
        </linearGradient>
        <clipPath id="clipPath-38">
          <path
            id="Path_1191036"
            data-name="Path 1191036"
            d="M24.674,25.948l.009,0,.051-.017.019-.006.053-.018.009,0,.062-.021.016,0,.048-.015.017-.006.061-.02h.006c.018-.007.037-.012.056-.018l.017-.006.049-.015.014,0,.06-.019.013,0c.016-.006.033-.01.049-.015l.017-.005.053-.016.007,0,.06-.017.015,0,.046-.013.016-.005.058-.016.008,0,.05-.014.017,0,.046-.012.013,0,.056-.015.015,0,.044-.011.016-.005.052-.013h0l.056-.015.015,0,.042-.011.015,0,.054-.013.01,0,.044-.011.017,0,.042-.011.011,0,.052-.011.014,0,.039-.009.016,0,.047-.01.006,0,.047-.011.016,0,.037-.008.014,0,.049-.011.009,0,.038-.009.016,0,.037-.008.011,0,.045-.01h.005l.093-1.375L25.34,23.19Zm.726-3,.108-.448Zm.108-.448,1.317.768.09-1.309L25.8,21.3Zm.543-2.252.075-.037a.189.189,0,0,1,.021-.009l.029-.015.021-.01.033-.016.018-.007c.2-.1.456-.21.756-.332L26.352,19Zm.65-2.688.492.319.019-.267-.45-.3Z"
            fill="none"
          />
        </clipPath>
        <linearGradient
          id="linear-gradient-25"
          x1="-2.643"
          y1="6.946"
          x2="-2.522"
          y2="6.946"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#12635e" />
          <stop offset="1" stopColor="#082b29" />
        </linearGradient>
        <clipPath id="clipPath-40">
          <path
            id="Path_1191074"
            data-name="Path 1191074"
            d="M42.373,23.842l-.316.183.1,1.375h0l.045.01.011,0,.037.008.016,0,.038.008.01,0,.048.011.014,0,.037.008.016,0,.048.011,0,0,.048.01.015,0,.039.009.014,0,.052.011.011,0,.042.011.017,0,.045.011.009,0,.054.013.015,0,.042.011.015,0,.056.015h0l.052.013.016.005.044.011.015,0,.056.015.012,0,.047.012.016,0,.051.014.008,0,.058.016.016.005.046.013.015,0,.06.017.007,0,.053.016.017.005c.016,0,.033.009.049.015l.012,0,.061.019.014,0,.048.015.018.006.057.018h0l.062.02.016.006a.4.4,0,0,1,.049.015l.016,0,.062.021.009,0,.053.018.019.006.051.018.01,0-.025-.1-.641-2.657Zm.95-1.347.108.448Zm-1.407-.541.09,1.309.587-.342.73-.426L43.035,21.3Zm-.089-2.137c.3.122.553.236.756.332l.018.007.033.016.021.01.029.015a.121.121,0,0,1,.02.009l.075.037L42.479,19Zm-.173-1.695.015.222.424-.5Zm-.035-.515.019.267.492-.319-.06-.252Z"
            fill="none"
          />
        </clipPath>
        <linearGradient
          id="linear-gradient-26"
          x1="-10.218"
          y1="5.908"
          x2="-9.968"
          y2="5.908"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#020a0a" />
          <stop offset="0.005" stopColor="#020a0a" />
          <stop offset="0.696" stopColor="#136e67" />
          <stop offset="1" stopColor="#136e67" />
        </linearGradient>
        <clipPath id="clipPath-42">
          <path
            id="Path_1191113"
            data-name="Path 1191113"
            d="M41.476,25.273l.069.011h0l.032.006h0a.2.2,0,0,1,.035.006l.038.006h.006l.03.006h.01l.032.006.006,0a.253.253,0,0,1,.038.007h.009l.03.006.012,0a.155.155,0,0,1,.031.006l.01,0,.04.007.009,0,.033.006.013,0,.03.006.013,0,.042.008.01,0,.033.007.016,0,.03.006.011,0-.1-1.375-.67-.4Zm-.089-1.65.619-.36-.09-1.309s-.224-.127-.636-.314Zm-.278-5.148c.009.16.019.338.027.5l.266-.315.267-.319-.015-.222Zm-.027-.505s.006.1.014.254l.542-.35-.019-.267Z"
            fill="none"
          />
        </clipPath>
        <linearGradient
          id="linear-gradient-27"
          x1="-5.214"
          y1="10.558"
          x2="-5.076"
          y2="10.558"
          xlinkHref="#linear-gradient-24"
        />
      </defs>
      <g id="Group_550178" data-name="Group 550178">
        <path
          id="Path_1190862"
          data-name="Path 1190862"
          d="M19.246,59.786H8.632V9.284L19.246,20.72Z"
          fill="#06b6b8"
        />
        <path
          id="Path_1190863"
          data-name="Path 1190863"
          d="M0,9.2V53.252l8.632,6.535V9.283l-5.747-6.7Z"
          fill="#05acad"
        />
        <path
          id="Path_1190864"
          data-name="Path 1190864"
          d="M34.858,20.721H19.246V59.787H50.47V20.721Z"
          fill="#024040"
        />
        <path
          id="Path_1190865"
          data-name="Path 1190865"
          d="M50.47,59.786H61.084V9.284L50.47,20.72Z"
          fill="#06b6b8"
        />
        <path
          id="Path_1190866"
          data-name="Path 1190866"
          d="M34.858,9.283H8.632L19.246,20.72H50.47L61.084,9.283Z"
          fill="#023838"
        />
        <path
          id="Path_1190867"
          data-name="Path 1190867"
          d="M34.858,2.582H2.885l5.747,6.7H61.084l5.747-6.7Z"
          fill="#023d3d"
        />
        <path
          id="Path_1190868"
          data-name="Path 1190868"
          d="M61.083,9.283v50.5l8.633-6.535V9.2L66.831,2.582Z"
          fill="#05acad"
        />
        <g id="Group_550093" data-name="Group 550093">
          <g
            id="Group_550092"
            data-name="Group 550092"
            clipPath="url(#clipPath)"
          >
            <line
              id="Line_11156"
              data-name="Line 11156"
              y2="1.334"
              transform="translate(11.949)"
              fill="none"
              stroke="#1c8399"
              strokeMiterlimit="10"
              strokeWidth="0.201"
            />
            <line
              id="Line_11157"
              data-name="Line 11157"
              y2="1.334"
              transform="translate(16.034)"
              fill="none"
              stroke="#1c8399"
              strokeMiterlimit="10"
              strokeWidth="0.201"
            />
            <line
              id="Line_11158"
              data-name="Line 11158"
              y2="1.334"
              transform="translate(20.119)"
              fill="none"
              stroke="#1c8399"
              strokeMiterlimit="10"
              strokeWidth="0.201"
            />
            <line
              id="Line_11159"
              data-name="Line 11159"
              y2="1.334"
              transform="translate(24.204)"
              fill="none"
              stroke="#1c8399"
              strokeMiterlimit="10"
              strokeWidth="0.201"
            />
            <line
              id="Line_11160"
              data-name="Line 11160"
              y2="1.334"
              transform="translate(28.288)"
              fill="none"
              stroke="#1c8399"
              strokeMiterlimit="10"
              strokeWidth="0.201"
            />
            <line
              id="Line_11161"
              data-name="Line 11161"
              y2="1.334"
              transform="translate(32.373)"
              fill="none"
              stroke="#1c8399"
              strokeMiterlimit="10"
              strokeWidth="0.201"
            />
            <line
              id="Line_11162"
              data-name="Line 11162"
              y2="1.334"
              transform="translate(36.458)"
              fill="none"
              stroke="#1c8399"
              strokeMiterlimit="10"
              strokeWidth="0.201"
            />
            <line
              id="Line_11163"
              data-name="Line 11163"
              y2="1.334"
              transform="translate(40.543)"
              fill="none"
              stroke="#1c8399"
              strokeMiterlimit="10"
              strokeWidth="0.201"
            />
            <line
              id="Line_11164"
              data-name="Line 11164"
              y2="1.334"
              transform="translate(44.627)"
              fill="none"
              stroke="#1c8399"
              strokeMiterlimit="10"
              strokeWidth="0.201"
            />
            <line
              id="Line_11165"
              data-name="Line 11165"
              y2="1.334"
              transform="translate(48.712)"
              fill="none"
              stroke="#1c8399"
              strokeMiterlimit="10"
              strokeWidth="0.201"
            />
            <line
              id="Line_11166"
              data-name="Line 11166"
              y2="1.334"
              transform="translate(52.797)"
              fill="none"
              stroke="#1c8399"
              strokeMiterlimit="10"
              strokeWidth="0.201"
            />
            <line
              id="Line_11167"
              data-name="Line 11167"
              y2="1.334"
              transform="translate(56.882)"
              fill="none"
              stroke="#1c8399"
              strokeMiterlimit="10"
              strokeWidth="0.201"
            />
            <path
              id="Path_1190869"
              data-name="Path 1190869"
              d="M58.866.2a1.9,1.9,0,0,1,0,3.8H9.966a1.9,1.9,0,0,1,0-3.8Zm0-.2H9.966a2.1,2.1,0,0,0,0,4.2h48.9a2.1,2.1,0,0,0,0-4.2"
              fill="#1c8399"
            />
            <rect
              id="Rectangle_9602"
              data-name="Rectangle 9602"
              width="54.989"
              height="2.867"
              transform="translate(6.921 1.335)"
              fill="#1c8399"
            />
          </g>
        </g>
        <g id="Group_550095" data-name="Group 550095">
          <g
            id="Group_550094"
            data-name="Group 550094"
            clipPath="url(#clipPath-2)"
          >
            <rect
              id="Rectangle_9604"
              data-name="Rectangle 9604"
              width="81.431"
              height="26.396"
              transform="translate(-5.882 43.604)"
              fill="url(#linear-gradient)"
            />
          </g>
        </g>
        <g id="Group_550097" data-name="Group 550097">
          <g
            id="Group_550096"
            data-name="Group 550096"
            clipPath="url(#clipPath-3)"
          >
            <rect
              id="Rectangle_9605"
              data-name="Rectangle 9605"
              width="68.482"
              height="6.242"
              transform="translate(0.605 51.149)"
              fill="url(#linear-gradient-2)"
            />
          </g>
        </g>
        <g id="Group_550099" data-name="Group 550099">
          <g
            id="Group_550098"
            data-name="Group 550098"
            clipPath="url(#clipPath-4)"
          >
            <rect
              id="Rectangle_9607"
              data-name="Rectangle 9607"
              width="79.647"
              height="25.372"
              transform="translate(-5.051 38.463)"
              fill="url(#radial-gradient)"
            />
          </g>
        </g>
        <g id="Group_550101" data-name="Group 550101">
          <g
            id="Group_550100"
            data-name="Group 550100"
            clipPath="url(#clipPath-5)"
          >
            <rect
              id="Rectangle_9608"
              data-name="Rectangle 9608"
              width="36.009"
              height="4.849"
              transform="translate(16.635 46.321)"
              fill="url(#linear-gradient-3)"
            />
          </g>
        </g>
        <g id="Group_550103" data-name="Group 550103">
          <g
            id="Group_550102"
            data-name="Group 550102"
            clipPath="url(#clipPath-6)"
          >
            <rect
              id="Rectangle_9610"
              data-name="Rectangle 9610"
              width="36.479"
              height="15.572"
              transform="translate(16.473 43.571)"
              fill="url(#linear-gradient-4)"
            />
          </g>
        </g>
        <g id="Group_550105" data-name="Group 550105">
          <g
            id="Group_550104"
            data-name="Group 550104"
            clipPath="url(#clipPath-7)"
          >
            <rect
              id="Rectangle_9611"
              data-name="Rectangle 9611"
              width="36.479"
              height="15.572"
              transform="translate(16.484 38.721)"
              fill="url(#radial-gradient-2)"
            />
          </g>
        </g>
        <g id="Group_550107" data-name="Group 550107">
          <g
            id="Group_550106"
            data-name="Group 550106"
            clipPath="url(#clipPath-8)"
          >
            <rect
              id="Rectangle_9612"
              data-name="Rectangle 9612"
              width="6.455"
              height="6.553"
              transform="translate(20.329 32.793)"
              fill="url(#linear-gradient-5)"
            />
          </g>
        </g>
        <g id="Group_550109" data-name="Group 550109">
          <g
            id="Group_550108"
            data-name="Group 550108"
            clipPath="url(#clipPath-9)"
          >
            <rect
              id="Rectangle_9613"
              data-name="Rectangle 9613"
              width="10.009"
              height="13.088"
              transform="translate(10.206 38.585) rotate(-28)"
              fill="url(#linear-gradient-6)"
            />
          </g>
        </g>
        <g id="Group_550111" data-name="Group 550111">
          <g
            id="Group_550110"
            data-name="Group 550110"
            clipPath="url(#clipPath-10)"
          >
            <rect
              id="Rectangle_9614"
              data-name="Rectangle 9614"
              width="9.546"
              height="12.842"
              transform="translate(11.227 38.585) rotate(-28)"
              fill="url(#linear-gradient-7)"
            />
          </g>
        </g>
        <g id="Group_550113" data-name="Group 550113">
          <g
            id="Group_550112"
            data-name="Group 550112"
            clipPath="url(#clipPath-11)"
          >
            <rect
              id="Rectangle_9615"
              data-name="Rectangle 9615"
              width="3.53"
              height="4.985"
              transform="translate(12.769 43.916) rotate(-25)"
              fill="url(#linear-gradient-8)"
            />
          </g>
        </g>
        <g id="Group_550115" data-name="Group 550115">
          <g
            id="Group_550114"
            data-name="Group 550114"
            clipPath="url(#clipPath-12)"
          >
            <rect
              id="Rectangle_9616"
              data-name="Rectangle 9616"
              width="3.895"
              height="6.553"
              transform="translate(19.616 32.793)"
              fill="url(#linear-gradient-9)"
            />
          </g>
        </g>
        <g id="Group_550117" data-name="Group 550117">
          <g
            id="Group_550116"
            data-name="Group 550116"
            clipPath="url(#clipPath-13)"
          >
            <rect
              id="Rectangle_9617"
              data-name="Rectangle 9617"
              width="6.455"
              height="6.553"
              transform="translate(42.046 32.793)"
              fill="url(#linear-gradient-10)"
            />
          </g>
        </g>
        <g id="Group_550119" data-name="Group 550119">
          <g
            id="Group_550118"
            data-name="Group 550118"
            clipPath="url(#clipPath-14)"
          >
            <rect
              id="Rectangle_9618"
              data-name="Rectangle 9618"
              width="13.087"
              height="10.008"
              transform="translate(43.643 45.441) rotate(-62)"
              fill="url(#linear-gradient-11)"
            />
          </g>
        </g>
        <g id="Group_550121" data-name="Group 550121">
          <g
            id="Group_550120"
            data-name="Group 550120"
            clipPath="url(#clipPath-15)"
          >
            <rect
              id="Rectangle_9619"
              data-name="Rectangle 9619"
              width="12.842"
              height="9.546"
              transform="matrix(0.469, -0.883, 0.883, 0.469, 43.146, 45.441)"
              fill="url(#linear-gradient-12)"
            />
          </g>
        </g>
        <g id="Group_550123" data-name="Group 550123">
          <g
            id="Group_550122"
            data-name="Group 550122"
            clipPath="url(#clipPath-16)"
          >
            <rect
              id="Rectangle_9620"
              data-name="Rectangle 9620"
              width="4.985"
              height="3.53"
              transform="translate(50.756 46.942) rotate(-65)"
              fill="url(#linear-gradient-13)"
            />
          </g>
        </g>
        <g id="Group_550125" data-name="Group 550125">
          <g
            id="Group_550124"
            data-name="Group 550124"
            clipPath="url(#clipPath-17)"
          >
            <rect
              id="Rectangle_9621"
              data-name="Rectangle 9621"
              width="3.896"
              height="6.553"
              transform="translate(45.32 32.793)"
              fill="url(#linear-gradient-14)"
            />
          </g>
        </g>
        <g id="Group_550127" data-name="Group 550127">
          <g
            id="Group_550126"
            data-name="Group 550126"
            clipPath="url(#clipPath)"
          >
            <path
              id="Path_1190884"
              data-name="Path 1190884"
              d="M48.644,32.413l-.6-5.615-1.665-.156-3.774-9.666-.88-1.092c-.794-.6-2.963-1.922-7.311-1.922S27.9,15.285,27.1,15.884l-.88,1.092L22.45,26.642l-1.665.156-.6,5.615,1.562.168-.2,4.573L23.4,41.128l2.117,1.009L27.333,43.3H41.5l1.815-1.159,2.118-1.009,1.85-3.974-.2-4.573Zm-7.2-7.786L41.2,24.4l.221-.1Zm-.358-6.657h0l.256,4.768a10.158,10.158,0,0,1-1.24.591l-1.64-1.588v-2.3a.7.7,0,0,0-.352-.608c-.018-.011-.144-.082-.354-.182l2.4-1.283a4.959,4.959,0,0,1,.928.6M30.622,23.09a3.081,3.081,0,0,0,.964.49,8.918,8.918,0,0,0,2.83.325,8.915,8.915,0,0,0,2.829-.325,3.081,3.081,0,0,0,.964-.49.7.7,0,0,0,.25-.536v-.509l1.416,1.371a15.464,15.464,0,0,1-5.459.9,15.466,15.466,0,0,1-5.46-.9l1.416-1.371v.509a.7.7,0,0,0,.25.536M34.416,16.3a13.169,13.169,0,0,1,5.495.956L37.5,18.541a7.243,7.243,0,0,0-6.175,0L28.92,17.255a13.171,13.171,0,0,1,5.5-.956M27.749,17.97h0a4.91,4.91,0,0,1,.927-.6l2.4,1.283c-.21.1-.336.171-.354.182a.7.7,0,0,0-.352.608v2.3l-1.64,1.588a10.23,10.23,0,0,1-1.24-.591Zm-.341,6.322.221.1-.239.231Zm.881,3.6a9.631,9.631,0,0,1-1.069-.1l.153-2.843.471-.456a12.9,12.9,0,0,0,1.692.59l1.194,2.813Zm8.288,0H32.254l-1.037-2.443a19.227,19.227,0,0,0,6.4,0Zm3.965,0H38.1l1.194-2.813a12.9,12.9,0,0,0,1.692-.59l.471.456.153,2.843a9.63,9.63,0,0,1-1.069.1"
              fill="#001317"
            />
          </g>
        </g>
        <g id="Group_550129" data-name="Group 550129">
          <g
            id="Group_550128"
            data-name="Group 550128"
            clipPath="url(#clipPath-19)"
          >
            <rect
              id="Rectangle_9623"
              data-name="Rectangle 9623"
              width="13.942"
              height="6.286"
              transform="translate(27.445 25.206)"
              fill="url(#linear-gradient-15)"
            />
          </g>
        </g>
        <g id="Group_550131" data-name="Group 550131">
          <g
            id="Group_550130"
            data-name="Group 550130"
            clipPath="url(#clipPath)"
          >
            <path
              id="Path_1190886"
              data-name="Path 1190886"
              d="M23.434,37.407l-1.884-.253,1.85,3.975,2.118,1.008.1-1.059Z"
              fill="#1d7b7d"
            />
            <path
              id="Path_1190887"
              data-name="Path 1190887"
              d="M34.416,37.343c-2.758-.011-5.358.063-8.18-.219l-2.8.283,10.981.168Z"
              fill="#488481"
            />
          </g>
        </g>
        <g id="Group_550133" data-name="Group 550133">
          <g
            id="Group_550132"
            data-name="Group 550132"
            clipPath="url(#clipPath-21)"
          >
            <rect
              id="Rectangle_9625"
              data-name="Rectangle 9625"
              width="3.175"
              height="4.825"
              transform="translate(23.434 32.582)"
              fill="url(#linear-gradient-16)"
            />
          </g>
        </g>
        <g id="Group_550135" data-name="Group 550135">
          <g
            id="Group_550134"
            data-name="Group 550134"
            clipPath="url(#clipPath)"
          >
            <path
              id="Path_1190889"
              data-name="Path 1190889"
              d="M27.172,32.89l-.563.018-.373,4.216.373-.257Z"
              fill="#12635e"
            />
            <path
              id="Path_1190890"
              data-name="Path 1190890"
              d="M24.012,32.581H21.748l-.2,4.573,1.884.253Z"
              fill="#09919a"
            />
            <path
              id="Path_1190891"
              data-name="Path 1190891"
              d="M23.171,26.574l-.721.068-1.665.156-.6,5.615,1.562.168H22.6a39.748,39.748,0,0,1,.566-6.007"
              fill="#29a4a9"
            />
            <path
              id="Path_1190892"
              data-name="Path 1190892"
              d="M26.762,17.3"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190893"
              data-name="Path 1190893"
              d="M25.34,23.19"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190894"
              data-name="Path 1190894"
              d="M25.8,21.3Z"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190895"
              data-name="Path 1190895"
              d="M26.544,17.55l-.843.765.523-1.339.88-1.092L26.762,17.3l-.061.252-.025-.016a.109.109,0,0,0-.132.011m-3.286,8.981.01-.005.082-.04.014-.006.081-.038.014-.007.082-.038.013,0,.085-.038.006,0,.087-.038,0,0,.086-.037.011-.005.083-.035.014,0,.082-.034.014,0c.027-.011.055-.023.083-.033l.01,0,.087-.033h0l.087-.034.008,0,.084-.032.012,0,.082-.03.014-.005.081-.029.012-.005.083-.028h0L25.8,21.3l.168-.695.089-.366.5-2.07.095-.392-.019-.012-1.1,1-3.073,7.87.721-.068.087-.043"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190896"
              data-name="Path 1190896"
              d="M23.171,26.574l.087-.043-.087.043"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190897"
              data-name="Path 1190897"
              d="M24.3,26.082l.084-.031-.084.031"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190898"
              data-name="Path 1190898"
              d="M23.736,26.311l.086-.037-.086.037"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190899"
              data-name="Path 1190899"
              d="M23.554,26.392l.085-.038-.085.038"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190900"
              data-name="Path 1190900"
              d="M23.459,26.435l.083-.038-.083.038"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190901"
              data-name="Path 1190901"
              d="M23.364,26.48l.082-.038-.082.038"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190902"
              data-name="Path 1190902"
              d="M23.268,26.527l.083-.041-.083.041"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190903"
              data-name="Path 1190903"
              d="M24.026,26.19l.083-.033-.083.033"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190904"
              data-name="Path 1190904"
              d="M23.645,26.351l.087-.038-.087.038"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190905"
              data-name="Path 1190905"
              d="M23.93,26.229l.082-.034-.082.034"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190906"
              data-name="Path 1190906"
              d="M24.119,26.153l.087-.034-.087.034"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190907"
              data-name="Path 1190907"
              d="M24.4,26.046l.081-.03-.081.03"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190908"
              data-name="Path 1190908"
              d="M24.208,26.118l.087-.033-.087.033"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190909"
              data-name="Path 1190909"
              d="M24.588,25.978l.082-.029-.082.029"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190910"
              data-name="Path 1190910"
              d="M23.833,26.269l.083-.035-.083.035"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190911"
              data-name="Path 1190911"
              d="M24.5,26.011l.081-.029-.081.029"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190912"
              data-name="Path 1190912"
              d="M23.171,26.574l-.721.068Z"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190913"
              data-name="Path 1190913"
              d="M26.774,24.025l.671-.4-.619-.36L25.508,22.5l-.108.448-.06.247Z"
              fill="#0d3136"
            />
            <path
              id="Path_1190914"
              data-name="Path 1190914"
              d="M25.4,22.943l-.06.247Z"
              fill="#0d3136"
            />
            <path
              id="Path_1190915"
              data-name="Path 1190915"
              d="M25.221,25.771l-.06.018.06-.018"
              fill="#136e67"
            />
            <path
              id="Path_1190916"
              data-name="Path 1190916"
              d="M25.146,25.793l-.048.015.048-.015"
              fill="#136e67"
            />
            <path
              id="Path_1190917"
              data-name="Path 1190917"
              d="M25.282,25.752l-.048.014.048-.014"
              fill="#136e67"
            />
            <path
              id="Path_1190918"
              data-name="Path 1190918"
              d="M25.872,25.588l-.052.014.052-.014"
              fill="#136e67"
            />
            <path
              id="Path_1190919"
              data-name="Path 1190919"
              d="M26.234,25.5l-.052.012.052-.012"
              fill="#136e67"
            />
            <path
              id="Path_1190920"
              data-name="Path 1190920"
              d="M25.931,25.572l-.055.014.055-.014"
              fill="#136e67"
            />
            <path
              id="Path_1190921"
              data-name="Path 1190921"
              d="M25.99,25.558l-.042.011.042-.011"
              fill="#136e67"
            />
            <path
              id="Path_1190922"
              data-name="Path 1190922"
              d="M26.058,25.541,26,25.554l.054-.013"
              fill="#136e67"
            />
            <path
              id="Path_1190923"
              data-name="Path 1190923"
              d="M26.171,25.513l-.043.01.043-.01"
              fill="#136e67"
            />
            <path
              id="Path_1190924"
              data-name="Path 1190924"
              d="M25.8,25.606l-.044.012.044-.012"
              fill="#136e67"
            />
            <path
              id="Path_1190925"
              data-name="Path 1190925"
              d="M25.353,25.731l-.054.016.054-.016"
              fill="#136e67"
            />
            <path
              id="Path_1190926"
              data-name="Path 1190926"
              d="M25.419,25.712l-.059.017.059-.017"
              fill="#136e67"
            />
            <path
              id="Path_1190927"
              data-name="Path 1190927"
              d="M25.746,25.621l-.057.015.057-.015"
              fill="#136e67"
            />
            <path
              id="Path_1190928"
              data-name="Path 1190928"
              d="M25.081,25.814l-.056.018.056-.018"
              fill="#136e67"
            />
            <path
              id="Path_1190929"
              data-name="Path 1190929"
              d="M25.481,25.694l-.045.013.045-.013"
              fill="#136e67"
            />
            <path
              id="Path_1190930"
              data-name="Path 1190930"
              d="M26.287,25.486l-.039.009.039-.009"
              fill="#136e67"
            />
            <path
              id="Path_1190931"
              data-name="Path 1190931"
              d="M25.614,25.657l-.051.014.051-.014"
              fill="#136e67"
            />
            <path
              id="Path_1190932"
              data-name="Path 1190932"
              d="M25.555,25.673l-.058.016.058-.016"
              fill="#136e67"
            />
            <path
              id="Path_1190933"
              data-name="Path 1190933"
              d="M25.677,25.64l-.046.013.046-.013"
              fill="#136e67"
            />
            <path
              id="Path_1190934"
              data-name="Path 1190934"
              d="M26.518,25.434l-.048.011.048-.011"
              fill="#136e67"
            />
            <path
              id="Path_1190935"
              data-name="Path 1190935"
              d="M26.675,25.4l-.045.009.045-.009"
              fill="#136e67"
            />
            <path
              id="Path_1190936"
              data-name="Path 1190936"
              d="M26.456,25.447l-.038.008.038-.008"
              fill="#136e67"
            />
            <path
              id="Path_1190937"
              data-name="Path 1190937"
              d="M26.619,25.412l-.037.008.037-.008"
              fill="#136e67"
            />
            <path
              id="Path_1190938"
              data-name="Path 1190938"
              d="M26.112,25.527l-.045.011.045-.011"
              fill="#136e67"
            />
            <path
              id="Path_1190939"
              data-name="Path 1190939"
              d="M26.566,25.423l-.038.008.038-.008"
              fill="#136e67"
            />
            <path
              id="Path_1190940"
              data-name="Path 1190940"
              d="M25.019,25.833l-.061.02.061-.02"
              fill="#136e67"
            />
            <path
              id="Path_1190941"
              data-name="Path 1190941"
              d="M24.877,25.879l-.062.02.062-.02"
              fill="#136e67"
            />
            <path
              id="Path_1190942"
              data-name="Path 1190942"
              d="M24.806,25.9l-.053.018.053-.018"
              fill="#136e67"
            />
            <path
              id="Path_1190943"
              data-name="Path 1190943"
              d="M24.941,25.858l-.048.016.048-.016"
              fill="#136e67"
            />
            <path
              id="Path_1190944"
              data-name="Path 1190944"
              d="M24.734,25.927l-.051.017.051-.017"
              fill="#136e67"
            />
            <path
              id="Path_1190945"
              data-name="Path 1190945"
              d="M26.35,25.471l-.048.011.048-.011"
              fill="#136e67"
            />
            <path
              id="Path_1190946"
              data-name="Path 1190946"
              d="M26.4,25.459l-.048.011.048-.011"
              fill="#136e67"
            />
            <path
              id="Path_1190947"
              data-name="Path 1190947"
              d="M25.34,23.19l.06-.247.4-1.64-1.122,4.644Z"
              fill="#136e67"
            />
            <path
              id="Path_1190948"
              data-name="Path 1190948"
              d="M25.507,22.5l1.318.767Z"
              fill="#136e67"
            />
            <path
              id="Path_1190949"
              data-name="Path 1190949"
              d="M27.168,25.305l-.031.006.031-.006"
              fill="#12635e"
            />
            <path
              id="Path_1190950"
              data-name="Path 1190950"
              d="M27.127,25.312l-.031.006.031-.006"
              fill="#12635e"
            />
            <path
              id="Path_1190951"
              data-name="Path 1190951"
              d="M27.246,25.292l-.035.006.035-.006"
              fill="#12635e"
            />
            <path
              id="Path_1190952"
              data-name="Path 1190952"
              d="M27.21,25.3l-.037.007.037-.007"
              fill="#12635e"
            />
            <path
              id="Path_1190953"
              data-name="Path 1190953"
              d="M27.355,25.273l-.069.012.069-.012"
              fill="#12635e"
            />
            <path
              id="Path_1190954"
              data-name="Path 1190954"
              d="M27.283,25.285l-.032.005.032-.005"
              fill="#12635e"
            />
            <path
              id="Path_1190955"
              data-name="Path 1190955"
              d="M26.821,25.37l-.042.008.042-.008"
              fill="#12635e"
            />
            <path
              id="Path_1190956"
              data-name="Path 1190956"
              d="M26.864,25.362l-.03.006.03-.006"
              fill="#12635e"
            />
            <path
              id="Path_1190957"
              data-name="Path 1190957"
              d="M26.769,25.381l-.033.007.033-.007"
              fill="#12635e"
            />
            <path
              id="Path_1190958"
              data-name="Path 1190958"
              d="M26.91,25.353l-.032.006.032-.006"
              fill="#12635e"
            />
            <path
              id="Path_1190959"
              data-name="Path 1190959"
              d="M26.959,25.343l-.04.008.04-.008"
              fill="#12635e"
            />
            <path
              id="Path_1190960"
              data-name="Path 1190960"
              d="M27.089,25.319l-.038.007.038-.007"
              fill="#12635e"
            />
            <path
              id="Path_1190961"
              data-name="Path 1190961"
              d="M27.042,25.328l-.03.006.03-.006"
              fill="#12635e"
            />
            <path
              id="Path_1190962"
              data-name="Path 1190962"
              d="M27,25.336l-.031.006L27,25.336"
              fill="#12635e"
            />
            <path
              id="Path_1190963"
              data-name="Path 1190963"
              d="M26.72,25.391l-.031.006.031-.006"
              fill="#12635e"
            />
            <path
              id="Path_1190964"
              data-name="Path 1190964"
              d="M26.826,23.263h0l.619.36Z"
              fill="#12635e"
            />
            <rect
              id="Rectangle_9626"
              data-name="Rectangle 9626"
              width="0.1"
              height="0.269"
              transform="translate(32.25 25.406)"
              fill="#11343a"
            />
            <rect
              id="Rectangle_9627"
              data-name="Rectangle 9627"
              width="0.1"
              height="0.269"
              transform="translate(31.586 25.406)"
              fill="#11343a"
            />
            <rect
              id="Rectangle_9628"
              data-name="Rectangle 9628"
              width="0.563"
              height="0.09"
              transform="translate(32.35 25.315)"
              fill="#11343a"
            />
            <rect
              id="Rectangle_9629"
              data-name="Rectangle 9629"
              width="0.563"
              height="0.09"
              transform="translate(31.023 25.315)"
              fill="#11343a"
            />
            <rect
              id="Rectangle_9630"
              data-name="Rectangle 9630"
              width="0.564"
              height="0.09"
              transform="translate(31.686 25.315)"
              fill="#11343a"
            />
            <rect
              id="Rectangle_9631"
              data-name="Rectangle 9631"
              width="0.1"
              height="0.09"
              transform="translate(32.25 25.315)"
              fill="#11343a"
            />
            <rect
              id="Rectangle_9632"
              data-name="Rectangle 9632"
              width="0.1"
              height="0.09"
              transform="translate(31.586 25.315)"
              fill="#11343a"
            />
            <rect
              id="Rectangle_9633"
              data-name="Rectangle 9633"
              width="0.663"
              height="0.109"
              transform="translate(32.25 25.097)"
              fill="#87b9a6"
            />
            <rect
              id="Rectangle_9634"
              data-name="Rectangle 9634"
              width="0.663"
              height="0.109"
              transform="translate(31.023 25.097)"
              fill="#87b9a6"
            />
            <path
              id="Path_1190965"
              data-name="Path 1190965"
              d="M32.25,25.316h.663v-.109H32.25Z"
              fill="#87b9a6"
            />
            <path
              id="Path_1190966"
              data-name="Path 1190966"
              d="M31.586,25.316h.1v-.109h-.663v.109Z"
              fill="#87b9a6"
            />
            <rect
              id="Rectangle_9635"
              data-name="Rectangle 9635"
              width="0.564"
              height="0.109"
              transform="translate(31.686 25.097)"
              fill="#87b9a6"
            />
            <rect
              id="Rectangle_9636"
              data-name="Rectangle 9636"
              width="0.564"
              height="0.109"
              transform="translate(31.686 25.206)"
              fill="#87b9a6"
            />
            <path
              id="Path_1190967"
              data-name="Path 1190967"
              d="M43.208,41.078H25.624l-.106,1.059L27.333,43.3H41.5l1.815-1.159Z"
              fill="#225856"
            />
            <path
              id="Path_1190968"
              data-name="Path 1190968"
              d="M34.416,37.575l-10.981-.168,2.189,3.671H43.208L45.4,37.407Z"
              fill="#28b0b0"
            />
            <path
              id="Path_1190969"
              data-name="Path 1190969"
              d="M43.208,41.078l.1,1.059,2.118-1.008,1.85-3.975-1.884.253Z"
              fill="#1d7b7d"
            />
            <path
              id="Path_1190970"
              data-name="Path 1190970"
              d="M34.416,37.343v.232l10.98-.168-2.8-.283c-2.822.282-5.421.208-8.179.219"
              fill="#488481"
            />
          </g>
        </g>
        <g id="Group_550137" data-name="Group 550137">
          <g
            id="Group_550136"
            data-name="Group 550136"
            clipPath="url(#clipPath-23)"
          >
            <rect
              id="Rectangle_9638"
              data-name="Rectangle 9638"
              width="4.808"
              height="5.682"
              transform="matrix(0.921, -0.391, 0.391, 0.921, 40.487, 33.319)"
              fill="url(#linear-gradient-17)"
            />
          </g>
        </g>
        <g id="Group_550139" data-name="Group 550139">
          <g
            id="Group_550138"
            data-name="Group 550138"
            clipPath="url(#clipPath)"
          >
            <path
              id="Path_1190972"
              data-name="Path 1190972"
              d="M42.595,37.124l-.373-4.216-.563-.018.563,3.977Z"
              fill="#12635e"
            />
            <path
              id="Path_1190973"
              data-name="Path 1190973"
              d="M41.387,31.492H27.445l-3.432,1.09,2.6.326.563-.018,2.2-.726c.019.02,10.073.02,10.092,0l2.2.726.563.018,2.6-.326Z"
              fill="#0d3136"
            />
            <path
              id="Path_1190974"
              data-name="Path 1190974"
              d="M46.226,32.581H44.818l.578,4.826,1.885-.253-.2-4.573Z"
              fill="#09919a"
            />
          </g>
        </g>
        <g id="Group_550141" data-name="Group 550141">
          <g
            id="Group_550140"
            data-name="Group 550140"
            clipPath="url(#clipPath-25)"
          >
            <rect
              id="Rectangle_9640"
              data-name="Rectangle 9640"
              width="24.346"
              height="10.2"
              transform="translate(21.712 25.316) rotate(-7)"
              fill="url(#linear-gradient-18)"
            />
          </g>
        </g>
        <g id="Group_550143" data-name="Group 550143">
          <g
            id="Group_550142"
            data-name="Group 550142"
            clipPath="url(#clipPath)"
          >
            <path
              id="Path_1190976"
              data-name="Path 1190976"
              d="M45.66,26.574a39.748,39.748,0,0,1,.566,6.007h.856l1.562-.168-.6-5.615-1.665-.156Z"
              fill="#29a4a9"
            />
            <path
              id="Path_1190977"
              data-name="Path 1190977"
              d="M42.2,17.768l1.106,1,3.073,7.87-.721-.068-.087-.043-.01-.005-.083-.04-.013-.006-.082-.039-.014-.006-.082-.038-.012-.006-.085-.038-.006,0-.087-.039h0l-.086-.037L45,26.269l-.082-.035-.014,0-.082-.034-.014,0-.083-.034-.011,0-.086-.034h0l-.086-.033-.008,0-.084-.031-.013,0-.081-.029-.014-.005-.081-.029-.013-.005-.082-.029h0l-.024-.1-1.1-4.543-.168-.7-.088-.365-.5-2.07-.1-.393Zm-.133-.465h0l.061.252.024-.016a.11.11,0,0,1,.133.011l.842.765-.523-1.34-.88-1.091Z"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190978"
              data-name="Path 1190978"
              d="M43.035,21.3Z"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190979"
              data-name="Path 1190979"
              d="M45.573,26.531l.087.043-.087-.043"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190980"
              data-name="Path 1190980"
              d="M45.009,26.274l.086.037-.086-.037"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190981"
              data-name="Path 1190981"
              d="M45.289,26.4l.082.038-.082-.038"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190982"
              data-name="Path 1190982"
              d="M45.192,26.354l.085.038-.085-.038"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190983"
              data-name="Path 1190983"
              d="M45.386,26.442l.082.038-.082-.038"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190984"
              data-name="Path 1190984"
              d="M45.48,26.486l.083.041-.083-.041"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190985"
              data-name="Path 1190985"
              d="M45.1,26.313l.087.038-.087-.038"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190986"
              data-name="Path 1190986"
              d="M44.915,26.235,45,26.27l-.083-.035"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190987"
              data-name="Path 1190987"
              d="M44.35,26.016l.081.03-.081-.03"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190988"
              data-name="Path 1190988"
              d="M44.819,26.195l.082.034-.082-.034"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190989"
              data-name="Path 1190989"
              d="M44.625,26.119l.087.034-.087-.034"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190990"
              data-name="Path 1190990"
              d="M44.255,25.982l.081.029-.081-.029"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190991"
              data-name="Path 1190991"
              d="M44.444,26.05l.084.031-.084-.031"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190992"
              data-name="Path 1190992"
              d="M44.722,26.157l.083.033-.083-.033"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190993"
              data-name="Path 1190993"
              d="M44.536,26.085l.087.033-.087-.033"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190994"
              data-name="Path 1190994"
              d="M44.16,25.949l.082.029-.082-.029"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190995"
              data-name="Path 1190995"
              d="M46.381,26.642h0l-.721-.068Z"
              fill="#5eb4c6"
            />
            <path
              id="Path_1190996"
              data-name="Path 1190996"
              d="M41.953,25.359l-.032-.006.032.006"
              fill="#12635e"
            />
            <path
              id="Path_1190997"
              data-name="Path 1190997"
              d="M41.912,25.351l-.04-.008.04.008"
              fill="#12635e"
            />
            <path
              id="Path_1190998"
              data-name="Path 1190998"
              d="M41.862,25.342l-.031-.006.031.006"
              fill="#12635e"
            />
            <path
              id="Path_1190999"
              data-name="Path 1190999"
              d="M42,25.368l-.03-.006.03.006"
              fill="#12635e"
            />
            <path
              id="Path_1191000"
              data-name="Path 1191000"
              d="M42.1,25.388l-.032-.007.032.007"
              fill="#12635e"
            />
            <path
              id="Path_1191001"
              data-name="Path 1191001"
              d="M41.819,25.334l-.03-.006.03.006"
              fill="#12635e"
            />
            <path
              id="Path_1191002"
              data-name="Path 1191002"
              d="M42.051,25.379l-.041-.008.041.008"
              fill="#12635e"
            />
            <path
              id="Path_1191003"
              data-name="Path 1191003"
              d="M41.62,25.3l-.035-.006.035.006"
              fill="#12635e"
            />
            <path
              id="Path_1191004"
              data-name="Path 1191004"
              d="M41.58,25.291l-.032-.005.032.005"
              fill="#12635e"
            />
            <path
              id="Path_1191005"
              data-name="Path 1191005"
              d="M41.545,25.285l-.069-.012.069.012"
              fill="#12635e"
            />
            <path
              id="Path_1191006"
              data-name="Path 1191006"
              d="M42.141,25.4l-.03-.006.03.006"
              fill="#12635e"
            />
            <path
              id="Path_1191007"
              data-name="Path 1191007"
              d="M41.658,25.3l-.037-.007.037.007"
              fill="#12635e"
            />
            <path
              id="Path_1191008"
              data-name="Path 1191008"
              d="M41.735,25.318l-.031-.006.031.006"
              fill="#12635e"
            />
            <path
              id="Path_1191009"
              data-name="Path 1191009"
              d="M41.694,25.311l-.03-.005.03.005"
              fill="#12635e"
            />
            <path
              id="Path_1191010"
              data-name="Path 1191010"
              d="M41.78,25.326l-.038-.007.038.007"
              fill="#12635e"
            />
          </g>
        </g>
        <g id="Group_550145" data-name="Group 550145">
          <g
            id="Group_550144"
            data-name="Group 550144"
            clipPath="url(#clipPath-27)"
          >
            <rect
              id="Rectangle_9642"
              data-name="Rectangle 9642"
              width="17.239"
              height="3.281"
              transform="translate(25.796 18.673)"
              fill="url(#linear-gradient-19)"
            />
          </g>
        </g>
        <g id="Group_550147" data-name="Group 550147">
          <g
            id="Group_550146"
            data-name="Group 550146"
            clipPath="url(#clipPath)"
          >
            <path
              id="Path_1191012"
              data-name="Path 1191012"
              d="M25.963,20.608h0L25.8,21.3Z"
              fill="#0d3136"
            />
            <path
              id="Path_1191013"
              data-name="Path 1191013"
              d="M43.035,21.3h0l-.168-.695Z"
              fill="#0d3136"
            />
          </g>
        </g>
        <g id="Group_550149" data-name="Group 550149">
          <g
            id="Group_550148"
            data-name="Group 550148"
            clipPath="url(#clipPath-29)"
          >
            <rect
              id="Rectangle_9644"
              data-name="Rectangle 9644"
              width="15.308"
              height="2.842"
              transform="translate(26.762 15.128)"
              fill="url(#linear-gradient-20)"
            />
          </g>
        </g>
        <g id="Group_550151" data-name="Group 550151">
          <g
            id="Group_550150"
            data-name="Group 550150"
            clipPath="url(#clipPath)"
          >
            <path
              id="Path_1191015"
              data-name="Path 1191015"
              d="M26.762,17.3Z"
              fill="#0d3136"
            />
            <path
              id="Path_1191016"
              data-name="Path 1191016"
              d="M42.069,17.3"
              fill="#0d3136"
            />
            <rect
              id="Rectangle_9645"
              data-name="Rectangle 9645"
              width="0.1"
              height="0.269"
              transform="translate(36.481 25.406)"
              fill="#11343a"
            />
            <rect
              id="Rectangle_9646"
              data-name="Rectangle 9646"
              width="0.1"
              height="0.269"
              transform="translate(37.145 25.406)"
              fill="#11343a"
            />
            <rect
              id="Rectangle_9647"
              data-name="Rectangle 9647"
              width="0.563"
              height="0.09"
              transform="translate(37.245 25.315)"
              fill="#11343a"
            />
            <rect
              id="Rectangle_9648"
              data-name="Rectangle 9648"
              width="0.564"
              height="0.09"
              transform="translate(36.581 25.315)"
              fill="#11343a"
            />
            <rect
              id="Rectangle_9649"
              data-name="Rectangle 9649"
              width="0.563"
              height="0.09"
              transform="translate(35.917 25.315)"
              fill="#11343a"
            />
            <rect
              id="Rectangle_9650"
              data-name="Rectangle 9650"
              width="0.1"
              height="0.09"
              transform="translate(36.481 25.315)"
              fill="#11343a"
            />
            <rect
              id="Rectangle_9651"
              data-name="Rectangle 9651"
              width="0.1"
              height="0.09"
              transform="translate(37.145 25.315)"
              fill="#11343a"
            />
            <rect
              id="Rectangle_9652"
              data-name="Rectangle 9652"
              width="0.663"
              height="0.109"
              transform="translate(37.145 25.097)"
              fill="#87b9a6"
            />
            <rect
              id="Rectangle_9653"
              data-name="Rectangle 9653"
              width="0.663"
              height="0.109"
              transform="translate(35.918 25.097)"
              fill="#87b9a6"
            />
            <path
              id="Path_1191017"
              data-name="Path 1191017"
              d="M36.481,25.316h.1v-.109h-.663v.109Z"
              fill="#87b9a6"
            />
            <path
              id="Path_1191018"
              data-name="Path 1191018"
              d="M37.145,25.316h.663v-.109h-.663Z"
              fill="#87b9a6"
            />
            <rect
              id="Rectangle_9654"
              data-name="Rectangle 9654"
              width="0.564"
              height="0.109"
              transform="translate(36.581 25.097)"
              fill="#87b9a6"
            />
            <rect
              id="Rectangle_9655"
              data-name="Rectangle 9655"
              width="0.564"
              height="0.109"
              transform="translate(36.581 25.206)"
              fill="#87b9a6"
            />
            <path
              id="Path_1191019"
              data-name="Path 1191019"
              d="M42.479,19h0l-.273-1.132.073.306-.094-.392Z"
              fill="#50b3ba"
            />
          </g>
        </g>
        <g id="Group_550153" data-name="Group 550153">
          <g
            id="Group_550152"
            data-name="Group 550152"
            clipPath="url(#clipPath-31)"
          >
            <rect
              id="Rectangle_9657"
              data-name="Rectangle 9657"
              width="9.768"
              height="9.664"
              transform="matrix(0.643, -0.766, 0.766, 0.643, 32.4, 22.074)"
              fill="url(#linear-gradient-21)"
            />
          </g>
        </g>
        <g id="Group_550155" data-name="Group 550155">
          <g
            id="Group_550154"
            data-name="Group 550154"
            clipPath="url(#clipPath-32)"
          >
            <rect
              id="Rectangle_9658"
              data-name="Rectangle 9658"
              width="15.308"
              height="3.341"
              transform="translate(26.762 13.962)"
              fill="url(#linear-gradient-22)"
            />
          </g>
        </g>
        <g id="Group_550157" data-name="Group 550157">
          <g
            id="Group_550156"
            data-name="Group 550156"
            clipPath="url(#clipPath)"
          >
            <path
              id="Path_1191022"
              data-name="Path 1191022"
              d="M26.762,17.3l.343-1.419Z"
              fill="#12635e"
            />
            <path
              id="Path_1191023"
              data-name="Path 1191023"
              d="M42.069,17.3l-.343-1.419Z"
              fill="#12635e"
            />
            <path
              id="Path_1191024"
              data-name="Path 1191024"
              d="M26.352,19h0l.294-1.218-.094.392.073-.306Z"
              fill="#50b3ba"
            />
          </g>
        </g>
        <g id="Group_550159" data-name="Group 550159">
          <g
            id="Group_550158"
            data-name="Group 550158"
            clipPath="url(#clipPath-34)"
          >
            <rect
              id="Rectangle_9660"
              data-name="Rectangle 9660"
              width="9.664"
              height="9.768"
              transform="matrix(0.766, -0.643, 0.643, 0.766, 22.749, 20.803)"
              fill="url(#linear-gradient-23)"
            />
          </g>
        </g>
        <g id="Group_550161" data-name="Group 550161">
          <g
            id="Group_550160"
            data-name="Group 550160"
            clipPath="url(#clipPath)"
          >
            <path
              id="Path_1191026"
              data-name="Path 1191026"
              d="M27.58,19.592l.006,0-.006,0"
              fill="#12635e"
            />
          </g>
        </g>
        <g id="Group_550163" data-name="Group 550163">
          <g
            id="Group_550162"
            data-name="Group 550162"
            clipPath="url(#clipPath-36)"
          >
            <rect
              id="Rectangle_9662"
              data-name="Rectangle 9662"
              width="7.689"
              height="3.67"
              transform="translate(24.175 24.488) rotate(-70)"
              fill="url(#linear-gradient-24)"
            />
          </g>
        </g>
        <g id="Group_550165" data-name="Group 550165">
          <g
            id="Group_550164"
            data-name="Group 550164"
            clipPath="url(#clipPath)"
          >
            <path
              id="Path_1191028"
              data-name="Path 1191028"
              d="M27.162,18.344l.533.635Z"
              fill="#12635e"
            />
            <path
              id="Path_1191029"
              data-name="Path 1191029"
              d="M42.13,17.555l-.061-.252Z"
              fill="#136e67"
            />
            <path
              id="Path_1191030"
              data-name="Path 1191030"
              d="M41.669,18.344l.424-.5Z"
              fill="#136e67"
            />
            <path
              id="Path_1191031"
              data-name="Path 1191031"
              d="M42.479,19l.3,1.244-.5-2.07Z"
              fill="#136e67"
            />
            <path
              id="Path_1191032"
              data-name="Path 1191032"
              d="M42.479,19l-.2-.826-.073-.306Z"
              fill="#136e67"
            />
            <path
              id="Path_1191033"
              data-name="Path 1191033"
              d="M27.177,18.123l-.439-.284.424.505Z"
              fill="#136e67"
            />
            <path
              id="Path_1191034"
              data-name="Path 1191034"
              d="M26.762,17.3h0l-.061.252Z"
              fill="#136e67"
            />
            <path
              id="Path_1191035"
              data-name="Path 1191035"
              d="M26.738,17.839h0l.424.505Z"
              fill="#136e67"
            />
          </g>
        </g>
        <g id="Group_550167" data-name="Group 550167">
          <g
            id="Group_550166"
            data-name="Group 550166"
            clipPath="url(#clipPath-38)"
          >
            <rect
              id="Rectangle_9664"
              data-name="Rectangle 9664"
              width="8.254"
              height="7.501"
              transform="translate(20.417 22.376) rotate(-50)"
              fill="url(#linear-gradient-25)"
            />
          </g>
        </g>
        <g id="Group_550169" data-name="Group 550169">
          <g
            id="Group_550168"
            data-name="Group 550168"
            clipPath="url(#clipPath)"
          >
            <path
              id="Path_1191037"
              data-name="Path 1191037"
              d="M26.352,19h0l.2-.826-.5,2.07Z"
              fill="#136e67"
            />
            <path
              id="Path_1191038"
              data-name="Path 1191038"
              d="M26.626,17.866l-.074.306-.2.826Z"
              fill="#136e67"
            />
            <path
              id="Path_1191039"
              data-name="Path 1191039"
              d="M27.262,19.713l-.04.016.04-.016"
              fill="#12635e"
            />
            <path
              id="Path_1191040"
              data-name="Path 1191040"
              d="M27.338,19.683l-.05.02.05-.02"
              fill="#12635e"
            />
            <path
              id="Path_1191041"
              data-name="Path 1191041"
              d="M42.868,20.607l-.089-.365-.015-.008c-.01,0-.02-.009-.03-.015l-.029-.013-.02-.01-.03-.014-.021-.01-.033-.016-.017-.008c-.212-.1-.477-.218-.792-.346l-.135-.055-.014,0-.17-.067-.026-.01-.087-.033-.033-.012-.05-.019-.039-.015-.072-.026-.049-.018-.047-.017-.055-.02-.064-.022-.055-.02-.045-.015c-.258-.09-.536-.18-.832-.268-.09-.028-.183-.054-.277-.081a19.314,19.314,0,0,0-10.653,0c-.094.027-.186.053-.277.081-.3.088-.573.178-.832.268l-.045.015-.055.02-.064.022-.054.02-.047.017-.049.018-.073.026-.007,0,.076-.028-.076.028-.006,0-.022.009-.2.076.2-.076.022-.008-.026.009-.05.019-.032.012-.088.033-.026.01-.02.008-.05.02-.026.01-.04.016-.034.013-.013,0-.018.007.035-.013-.035.013L27,19.816l.035-.014c-.315.128-.58.247-.791.346l-.017.008-.034.016-.02.01-.03.014-.02.01-.029.013-.031.015-.015.008-.088.365a19.426,19.426,0,0,1,16.9,0M27.1,19.779l.029-.012-.029.012"
              fill="#12635e"
            />
            <path
              id="Path_1191042"
              data-name="Path 1191042"
              d="M26.052,20.242h0l-.088.366Z"
              fill="#12635e"
            />
            <path
              id="Path_1191043"
              data-name="Path 1191043"
              d="M42.779,20.242l.088.366Z"
              fill="#12635e"
            />
            <path
              id="Path_1191044"
              data-name="Path 1191044"
              d="M41.447,19.666l-.087-.033.087.033"
              fill="#12635e"
            />
            <path
              id="Path_1191045"
              data-name="Path 1191045"
              d="M41.327,19.62l-.05-.019.05.019"
              fill="#12635e"
            />
            <path
              id="Path_1191046"
              data-name="Path 1191046"
              d="M41.238,19.587l-.072-.027.072.027"
              fill="#12635e"
            />
            <path
              id="Path_1191047"
              data-name="Path 1191047"
              d="M41.116,19.542l-.047-.017.047.017"
              fill="#12635e"
            />
            <path
              id="Path_1191048"
              data-name="Path 1191048"
              d="M40.9,19.464l-.045-.016.045.016"
              fill="#12635e"
            />
            <path
              id="Path_1191049"
              data-name="Path 1191049"
              d="M41.643,19.743l-.17-.068.17.068"
              fill="#12635e"
            />
            <path
              id="Path_1191050"
              data-name="Path 1191050"
              d="M41.827,19.817h0l-.17-.069.134.054.036.015"
              fill="#12635e"
            />
            <path
              id="Path_1191051"
              data-name="Path 1191051"
              d="M41.015,19.506l-.064-.023.064.023"
              fill="#12635e"
            />
            <path
              id="Path_1191052"
              data-name="Path 1191052"
              d="M27.88,19.483l-.064.023.064-.023"
              fill="#12635e"
            />
            <path
              id="Path_1191053"
              data-name="Path 1191053"
              d="M27.222,19.729h0l.04-.016h0l.026-.01.05-.02h0l.02-.007-.17.067.034-.014"
              fill="#12635e"
            />
            <path
              id="Path_1191054"
              data-name="Path 1191054"
              d="M27.472,19.632c-.029.012-.059.022-.087.034.028-.012.058-.022.087-.034"
              fill="#12635e"
            />
            <path
              id="Path_1191055"
              data-name="Path 1191055"
              d="M27.554,19.6l-.05.019.05-.019"
              fill="#12635e"
            />
            <path
              id="Path_1191056"
              data-name="Path 1191056"
              d="M27,19.817l.153-.062.018-.007Z"
              fill="#12635e"
            />
            <path
              id="Path_1191057"
              data-name="Path 1191057"
              d="M27.761,19.525l-.047.017.047-.017"
              fill="#12635e"
            />
            <path
              id="Path_1191058"
              data-name="Path 1191058"
              d="M27.666,19.56l-.073.027.073-.027"
              fill="#12635e"
            />
            <path
              id="Path_1191059"
              data-name="Path 1191059"
              d="M27.98,19.448l-.045.016.045-.016"
              fill="#12635e"
            />
            <path
              id="Path_1191060"
              data-name="Path 1191060"
              d="M27.557,19.6l.022-.008-.022.008"
              fill="#12635e"
            />
            <path
              id="Path_1191061"
              data-name="Path 1191061"
              d="M27.557,19.6l-.2.076.2-.076"
              fill="#12635e"
            />
            <path
              id="Path_1191062"
              data-name="Path 1191062"
              d="M27.662,19.562l-.076.028.076-.028"
              fill="#12635e"
            />
            <path
              id="Path_1191063"
              data-name="Path 1191063"
              d="M41.827,19.817l-.036-.015c.315.129.581.248.793.347-.2-.1-.457-.209-.757-.332"
              fill="#12635e"
            />
            <path
              id="Path_1191064"
              data-name="Path 1191064"
              d="M42.733,20.22l.031.015.015.007-.075-.036.029.014"
              fill="#12635e"
            />
            <path
              id="Path_1191065"
              data-name="Path 1191065"
              d="M42.685,20.2l-.03-.014.03.014"
              fill="#12635e"
            />
            <path
              id="Path_1191066"
              data-name="Path 1191066"
              d="M42.634,20.172l-.033-.016.033.016"
              fill="#12635e"
            />
            <path
              id="Path_1191067"
              data-name="Path 1191067"
              d="M42.779,20.242Z"
              fill="#12635e"
            />
            <path
              id="Path_1191068"
              data-name="Path 1191068"
              d="M41.791,19.8h0l.036.015-.036-.015"
              fill="#12635e"
            />
            <path
              id="Path_1191069"
              data-name="Path 1191069"
              d="M26.247,20.149c.211-.1.477-.218.792-.346L27,19.817c-.3.123-.554.236-.757.332"
              fill="#12635e"
            />
            <path
              id="Path_1191070"
              data-name="Path 1191070"
              d="M26.177,20.182l-.03.014.03-.014"
              fill="#12635e"
            />
            <path
              id="Path_1191071"
              data-name="Path 1191071"
              d="M26.1,20.22l.029-.014-.075.036.015-.007.031-.015"
              fill="#12635e"
            />
            <path
              id="Path_1191072"
              data-name="Path 1191072"
              d="M26.23,20.157l-.033.016.033-.016"
              fill="#12635e"
            />
            <path
              id="Path_1191073"
              data-name="Path 1191073"
              d="M26.052,20.242Z"
              fill="#12635e"
            />
          </g>
        </g>
        <g id="Group_550171" data-name="Group 550171">
          <g
            id="Group_550170"
            data-name="Group 550170"
            clipPath="url(#clipPath-40)"
          >
            <rect
              id="Rectangle_9666"
              data-name="Rectangle 9666"
              width="4.002"
              height="8.955"
              transform="translate(40.141 17.564) rotate(-10)"
              fill="url(#linear-gradient-26)"
            />
          </g>
        </g>
        <g id="Group_550173" data-name="Group 550173">
          <g
            id="Group_550172"
            data-name="Group 550172"
            clipPath="url(#clipPath)"
          >
            <path
              id="Path_1191075"
              data-name="Path 1191075"
              d="M43.072,25.617l-.044-.012.044.012"
              fill="#136e67"
            />
            <path
              id="Path_1191076"
              data-name="Path 1191076"
              d="M43.011,25.6l-.052-.014.052.014"
              fill="#136e67"
            />
            <path
              id="Path_1191077"
              data-name="Path 1191077"
              d="M42.955,25.587l-.055-.014.055.014"
              fill="#136e67"
            />
            <path
              id="Path_1191078"
              data-name="Path 1191078"
              d="M43.142,25.636l-.057-.015.057.015"
              fill="#136e67"
            />
            <path
              id="Path_1191079"
              data-name="Path 1191079"
              d="M43.2,25.652l-.047-.013.047.013"
              fill="#136e67"
            />
            <path
              id="Path_1191080"
              data-name="Path 1191080"
              d="M42.649,25.511,42.6,25.5l.052.012"
              fill="#136e67"
            />
            <path
              id="Path_1191081"
              data-name="Path 1191081"
              d="M42.3,25.431c-.013,0-.025-.006-.038-.007.013,0,.025.005.038.007"
              fill="#136e67"
            />
            <path
              id="Path_1191082"
              data-name="Path 1191082"
              d="M42.361,25.444l-.048-.011.048.011"
              fill="#136e67"
            />
            <path
              id="Path_1191083"
              data-name="Path 1191083"
              d="M42.412,25.456l-.037-.008.037.008"
              fill="#136e67"
            />
            <path
              id="Path_1191084"
              data-name="Path 1191084"
              d="M42.249,25.42l-.037-.008.037.008"
              fill="#136e67"
            />
            <path
              id="Path_1191085"
              data-name="Path 1191085"
              d="M42.884,25.569l-.042-.012.042.012"
              fill="#136e67"
            />
            <path
              id="Path_1191086"
              data-name="Path 1191086"
              d="M42.2,25.41l-.045-.009.045.009"
              fill="#136e67"
            />
            <path
              id="Path_1191087"
              data-name="Path 1191087"
              d="M42.475,25.47l-.048-.011.048.011"
              fill="#136e67"
            />
            <path
              id="Path_1191088"
              data-name="Path 1191088"
              d="M42.7,25.523c-.014,0-.028-.007-.043-.009.015,0,.029.007.043.009"
              fill="#136e67"
            />
            <path
              id="Path_1191089"
              data-name="Path 1191089"
              d="M42.764,25.538l-.045-.011.045.011"
              fill="#136e67"
            />
            <path
              id="Path_1191090"
              data-name="Path 1191090"
              d="M42.827,25.554l-.054-.013.054.013"
              fill="#136e67"
            />
            <path
              id="Path_1191091"
              data-name="Path 1191091"
              d="M43.269,25.671l-.051-.014.051.014"
              fill="#136e67"
            />
            <path
              id="Path_1191092"
              data-name="Path 1191092"
              d="M42.583,25.5l-.039-.009.039.009"
              fill="#136e67"
            />
            <path
              id="Path_1191093"
              data-name="Path 1191093"
              d="M42.528,25.482l-.048-.011.048.011"
              fill="#136e67"
            />
            <path
              id="Path_1191094"
              data-name="Path 1191094"
              d="M43.334,25.69l-.058-.016.058.016"
              fill="#136e67"
            />
            <path
              id="Path_1191095"
              data-name="Path 1191095"
              d="M43.67,25.789l-.06-.018.06.018"
              fill="#136e67"
            />
            <path
              id="Path_1191096"
              data-name="Path 1191096"
              d="M44.079,25.921l-.054-.018.054.018"
              fill="#136e67"
            />
            <path
              id="Path_1191097"
              data-name="Path 1191097"
              d="M43.531,25.747l-.054-.016.054.016"
              fill="#136e67"
            />
            <path
              id="Path_1191098"
              data-name="Path 1191098"
              d="M43.471,25.729l-.059-.017.059.017"
              fill="#136e67"
            />
            <path
              id="Path_1191099"
              data-name="Path 1191099"
              d="M43.6,25.767l-.048-.015.048.015"
              fill="#136e67"
            />
            <path
              id="Path_1191100"
              data-name="Path 1191100"
              d="M43.732,25.808l-.048-.015.048.015"
              fill="#136e67"
            />
            <path
              id="Path_1191101"
              data-name="Path 1191101"
              d="M43.873,25.853l-.061-.02.061.02"
              fill="#136e67"
            />
            <path
              id="Path_1191102"
              data-name="Path 1191102"
              d="M43.806,25.832l-.056-.019.056.019"
              fill="#136e67"
            />
            <path
              id="Path_1191103"
              data-name="Path 1191103"
              d="M44.016,25.9l-.062-.02.062.02"
              fill="#136e67"
            />
            <path
              id="Path_1191104"
              data-name="Path 1191104"
              d="M43.4,25.707l-.046-.013.046.013"
              fill="#136e67"
            />
            <path
              id="Path_1191105"
              data-name="Path 1191105"
              d="M44.148,25.945l-.051-.017.051.017"
              fill="#136e67"
            />
            <path
              id="Path_1191106"
              data-name="Path 1191106"
              d="M43.938,25.874l-.048-.016.048.016"
              fill="#136e67"
            />
            <path
              id="Path_1191107"
              data-name="Path 1191107"
              d="M43.432,22.943l.06.247.641,2.656-1.1-4.543Z"
              fill="#136e67"
            />
            <path
              id="Path_1191108"
              data-name="Path 1191108"
              d="M43.324,22.5l-.73.425-.588.342-.619.361.671.4.316-.184,1.118-.651Z"
              fill="#0d3136"
            />
            <path
              id="Path_1191109"
              data-name="Path 1191109"
              d="M41.387,23.623l.619-.36Z"
              fill="#0d3136"
            />
            <path
              id="Path_1191110"
              data-name="Path 1191110"
              d="M43.324,22.5l.168.695-1.118.651,1.118-.651-.06-.248Z"
              fill="#0d3136"
            />
            <path
              id="Path_1191111"
              data-name="Path 1191111"
              d="M42.593,22.921l-.588.342Z"
              fill="#0d3136"
            />
            <path
              id="Path_1191112"
              data-name="Path 1191112"
              d="M43.491,23.19l-.06-.247Z"
              fill="#0d3136"
            />
          </g>
        </g>
        <g id="Group_550175" data-name="Group 550175">
          <g
            id="Group_550174"
            data-name="Group 550174"
            clipPath="url(#clipPath-42)"
          >
            <rect
              id="Rectangle_9668"
              data-name="Rectangle 9668"
              width="7.284"
              height="4.823"
              transform="matrix(0.5, -0.866, 0.866, 0.5, 37.708, 23.452)"
              fill="url(#linear-gradient-27)"
            />
          </g>
        </g>
        <g id="Group_550177" data-name="Group 550177">
          <g
            id="Group_550176"
            data-name="Group 550176"
            clipPath="url(#clipPath)"
          >
            <path
              id="Path_1191114"
              data-name="Path 1191114"
              d="M41.4,18.663l.268-.319Z"
              fill="#12635e"
            />
            <path
              id="Path_1191115"
              data-name="Path 1191115"
              d="M29.089,19.1h0c-.094.027-.187.053-.277.081l-1.091-.706-.544-.352-.439-.284-.092-.059-.018-.011-1.1,1L24.392,19.8l.583.377-.081.207-.739-.478h0l0,0,0,0,0,0,0-.005h0v0l0-.005,0,0,0,0,0-.005,0,0,0,0v-.005l0,0V19.79l0-.005v0l0-.005,0,0,0-.006,0,0,0-.006v0l0,0,0,0,0,0,0,0,0-.005h0l1.56-1.417.843-.765a.107.107,0,0,1,.132-.011l.025.016.493.318.541.35Z"
              fill="#ccdadb"
            />
            <path
              id="Path_1191116"
              data-name="Path 1191116"
              d="M44.726,19.811v-.026l0,0,0-.005v0l0-.006,0,0,0-.006h0l0,0,0-.006,0,0,0,0,0,0,0,0-1.56-1.417-.843-.765a.108.108,0,0,0-.132-.011l-.025.016-.493.319-.541.35-1.354.875h0c.094.026.187.053.277.08l1.091-.7.544-.352.439-.284.092-.059.018-.012,1.1,1L44.439,19.8l-.583.377.081.208.739-.478,0,0,0,0,0,0,0,0,0,0,0,0h0l0-.005,0,0,0,0,0,0,0-.005,0,0v0l0-.006v-.036"
              fill="#ccdadb"
            />
            <path
              id="Path_1191117"
              data-name="Path 1191117"
              d="M64.742,16.463v41.1L54.063,61.133V16.463Z"
              fill="#efefef"
            />
            <path
              id="Path_1191118"
              data-name="Path 1191118"
              d="M66.831,2.582,69.716,9.2l-4.974,7.267H54.063L49.036,2.582Z"
              fill="#d0d0d0"
            />
            <path
              id="Path_1191119"
              data-name="Path 1191119"
              d="M69.715,9.2V53.252l-4.974,4.309v-41.1Z"
              fill="#dcdcdc"
            />
            <path
              id="Path_1191120"
              data-name="Path 1191120"
              d="M4.974,16.463v41.1l10.679,3.572V16.463Z"
              fill="#efefef"
            />
            <path
              id="Path_1191121"
              data-name="Path 1191121"
              d="M2.885,2.582,0,9.2l4.974,7.267H15.653L20.68,2.582Z"
              fill="#d0d0d0"
            />
            <path
              id="Path_1191122"
              data-name="Path 1191122"
              d="M0,9.2V53.252l4.974,4.309v-41.1Z"
              fill="#b5b5b5"
            />
            <rect
              id="Rectangle_9669"
              data-name="Rectangle 9669"
              width="61.471"
              height="2.963"
              transform="translate(3.68 45.783)"
              fill="#348899"
            />
            <path
              id="Path_1191123"
              data-name="Path 1191123"
              d="M47.029,1.11l1.546,14.005H64.753L61.97,1.11Z"
              fill="#ddd"
            />
            <rect
              id="Rectangle_9670"
              data-name="Rectangle 9670"
              width="16.178"
              height="29.41"
              transform="translate(48.575 15.114)"
              fill="#fff"
            />
            <rect
              id="Rectangle_9671"
              data-name="Rectangle 9671"
              width="16.178"
              height="2.316"
              transform="translate(48.575 44.524)"
              fill="#c7c7c7"
            />
            <path
              id="Path_1191124"
              data-name="Path 1191124"
              d="M21.8,1.11,20.256,15.115H4.078L6.861,1.11Z"
              fill="#ddd"
            />
            <rect
              id="Rectangle_9672"
              data-name="Rectangle 9672"
              width="16.178"
              height="29.41"
              transform="translate(4.078 15.114)"
              fill="#fff"
            />
            <rect
              id="Rectangle_9673"
              data-name="Rectangle 9673"
              width="16.178"
              height="2.316"
              transform="translate(4.078 44.524)"
              fill="#c7c7c7"
            />
            <rect
              id="Rectangle_9674"
              data-name="Rectangle 9674"
              width="37.403"
              height="14.347"
              transform="translate(15.714 47.72)"
              fill="#e5e5e5"
            />
            <path
              id="Path_1191125"
              data-name="Path 1191125"
              d="M55.061,46.888l-1.944.832V62.067l1.944-2.047Z"
              fill="#d1d1d1"
            />
            <path
              id="Path_1191126"
              data-name="Path 1191126"
              d="M13.77,46.888l1.944.832V62.067L13.77,60.02Z"
              fill="silver"
            />
            <path
              id="Path_1191127"
              data-name="Path 1191127"
              d="M13.77,46.888l1.944.832h37.4l1.945-.832Z"
              fill="#fff"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

OpenedDome.displayName = "SVG.OpenedDome";

OpenedDome.propTypes = svgShape;

export default OpenedDome;
