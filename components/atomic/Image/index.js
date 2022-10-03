import classNames from "classnames";
import imageShape from "@/shapes/image";

export default function Image({ image, className, title, ...props }) {
  const { url, url2x, url3x, width, height, altText } = image;

  const urls = [url, url2x, url3x];

  const getSrcSet = (resolutions) => {
    let srcSet = "";

    resolutions.forEach((resolution, i) => {
      srcSet += resolution ? `${i > 0 ? ", " : ""}${resolution} ${i + 1}x` : "";
    });

    return srcSet;
  };

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={altText || title}
      className={classNames({
        [`${className}`]: !!className,
      })}
      src={url}
      srcSet={getSrcSet(urls)}
      width={width}
      height={height}
      loading="lazy"
      {...props}
    />
  );
}

Image.displayName = "Atomic.Image";

Image.propTypes = imageShape;
