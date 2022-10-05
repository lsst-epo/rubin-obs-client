import NextImage from "next/image";
import PropTypes from "prop-types";

function CantoImage({
  url,
  width,
  height,
  altText = "",
  quality = 50,
  layout = "responsive",
  sizes,
  className,
}) {
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

CantoImage.displayName = "Atomic.Image";

CantoImage.propTypes = {
  url: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  altText: PropTypes.string,
  quality: PropTypes.number,
  layout: PropTypes.string,
  sizes: PropTypes.string,
  className: PropTypes.string,
};

export default CantoImage;
