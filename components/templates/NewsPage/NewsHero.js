import PropTypes from "prop-types";
import imageShape from "@/shapes/image";
import * as Styled from "./styles";
import Hero from "@/components/molecules/Hero";

export default function NewsHero({
  data,
  className,
  caption,
  children,
  focalPointX,
  focalPointY,
}) {
  const imageData = data && data[0];

  if (!imageData?.url) return null;

  if (caption)
    return (
      <Styled.HeroFigure className={className}>
        <Hero {...{ className, data, focalPointX, focalPointY }} />
        <Styled.HeroFigCaption dangerouslySetInnerHTML={{ __html: caption }} />
      </Styled.HeroFigure>
    );

  return (
    <Hero {...{ className, data, focalPointX, focalPointY }}>{children}</Hero>
  );
}

NewsHero.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(imageShape),
  children: PropTypes.node,
  caption: PropTypes.string,
  focalPointX: PropTypes.number,
  focalPointY: PropTypes.number,
};
