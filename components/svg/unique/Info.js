import defaultProps from "./defaultProps";
import svgShape from "@/shapes/svg";

const Info = ({ width = 20, height = 20 }) => {
  const uniqueProps = {
    viewBox: "0 0 60 60",
    width,
    height,
  };

  const mergedSvgProps = { ...defaultProps, ...uniqueProps };
  return (
    <svg {...mergedSvgProps}>
      <path
        style={{ fill: "#fff" }}
        d="M39.9,16.9c-.8,2.9-3.9,4.7-6.9,3.8-2.9-.8-4.7-3.9-3.8-6.9s3.9-4.7,6.9-3.8,4.7,3.9,3.8,6.9M34.7,47.3l-.8,1.9c-10.9,4.1-14.4-2-12.2-7.4l4.6-11.2c.9-2.3.7-4.5-4.9-4.8l.8-1.9c10.9-4.1,14.4,2,12.2,7.4l-4.6,11.2c-.9,2.3-.7,4.5,4.9,4.8M30,0C13.4,0,0,13.4,0,30s13.4,30,30,30,30-13.4,30-30S46.6,0,30,0"
      />
    </svg>
  );
};

Info.displayName = "SVG.Info";

Info.propTypes = svgShape;

export default Info;
