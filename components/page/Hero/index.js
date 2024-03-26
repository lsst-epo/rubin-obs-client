import PropTypes from "prop-types";
import imageShape from "@/shapes/image";
import * as Styled from "./styles";

export default function Hero({
  data,
  focalPointX,
  focalPointY,
  className,
  children,
}) {
  const imageData = data && data[0];

  if (!imageData?.url) return null;

  return (
    <Styled.HeroContainer className={className}>
      <Styled.HeroImage
        $focalPointX={focalPointX || 50}
        $focalPointY={focalPointY || 50}
        role="presentation"
        image={imageData}
      />
      {children}
    </Styled.HeroContainer>
  );
}

Hero.displayName = "Global.Hero";

Hero.propTypes = {
  data: PropTypes.arrayOf(imageShape),
  children: PropTypes.node,
  className: PropTypes.string,
  focalPointX: PropTypes.number,
  focalPointY: PropTypes.number,
};
