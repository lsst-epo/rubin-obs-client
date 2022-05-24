import classNames from "classnames";
import imageShape from "@/shapes/image";

const position = (x, y) => {
  if (!x && !y) return null;
  return `${x || 50}% ${y || 50}%`;
};

export default function Image({ image, className, title, ...props }) {
  const {
    url,
    url2x,
    url3x,
    width,
    height,
    altText,
    focalPointX,
    focalPointY,
  } = image;
  const style = {
    objectPosition: position(focalPointX, focalPointY),
  };

  const urls = [url, url2x, url3x];

  const getSrcSet = (resolutions) => {
    let srcSet = "";

    resolutions.forEach((resolution, i) => {
      srcSet += resolution ? `${i > 0 ? ", " : ""}${resolution} ${i + 1}x` : "";
    });

    return srcSet;
  };

  return (
    <img
      alt={altText || title}
      className={classNames({
        [`${className}`]: !!className,
      })}
      height={height}
      src={url}
      srcSet={getSrcSet(urls)}
      style={style}
      width={width}
      {...props}
    />
  );
}

Image.displayName = "Atomic.Image";

Image.propTypes = imageShape;
