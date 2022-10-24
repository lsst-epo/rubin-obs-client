import PropTypes from "prop-types";
function CantoMedia({
  scheme = "image",
  srcset,
  src,
  video,
  poster,
  width,
  height,
  alt = "",
  sizes,
  className,
}) {
  const srcsetToString = () =>
    Object.keys(srcset)
      .map((src) => `${srcset[src]} ${src}w`)
      .join(",");

  if (scheme === "video") {
    return (
      <video
        src={src}
        controls={true}
        width={width}
        height={height}
        poster={poster}
        loading="lazy"
        className={className}
      />
    );
  }

  return (
    <img
      srcSet={srcsetToString()}
      src={src}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      loading="lazy"
      className={className}
    />
  );
}

CantoMedia.displayName = "Atomic.CantoMedia";

CantoMedia.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  srcset: PropTypes.object,
  poster: PropTypes.string,
  scheme: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
};

export default CantoMedia;
