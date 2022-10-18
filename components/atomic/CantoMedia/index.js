import NextImage from "next/image";
import PropTypes from "prop-types";

function CantoMedia({
  scheme,
  url,
  width,
  height,
  altText = "",
  quality = 50,
  layout = "responsive",
  sizes,
  poster,
  className,
}) {
  if (scheme === "video") {
    return (
      <video
        src={url}
        controls={true}
        width={width}
        height={height}
        poster={poster}
        loading="lazy"
      />
    );
  }

  // next/image won't accept width/height values if layout === "fill"
  const dimensionProps = layout === "fill" ? {} : { width, height };

  return (
    <NextImage
      src={url}
      alt={altText}
      quality={quality}
      layout={layout}
      objectFit={layout === "fill" ? "cover" : null}
      sizes={sizes}
      className={className}
      {...dimensionProps}
    />
  );
}

CantoMedia.displayName = "Atomic.CantoMedia";

CantoMedia.propTypes = {
  url: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  scheme: PropTypes.string,
  altText: PropTypes.string,
  quality: PropTypes.number,
  layout: PropTypes.string,
  sizes: PropTypes.string,
  poster: PropTypes.string,
  className: PropTypes.string,
};

export default CantoMedia;
