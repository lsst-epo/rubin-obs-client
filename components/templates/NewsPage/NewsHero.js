import PropTypes from "prop-types";
import imageShape from "@/shapes/image";
import * as Styled from "./styles";

export default function NewsHero({ data, className, caption, children }) {
  const imageData = data && data[0];

  if (!imageData?.url) return null;

  if (caption)
    return (
      <Styled.HeroFigure className={className}>
        <Styled.HeroImageContainer>
          <Styled.HeroImage image={imageData} />
        </Styled.HeroImageContainer>
        <Styled.HeroFigCaption dangerouslySetInnerHTML={{ __html: caption }} />
      </Styled.HeroFigure>
    );

  return (
    <Styled.Hero className={className}>
      <Styled.HeroImage role="presentation" image={imageData} />
      {children}
    </Styled.Hero>
  );
}

NewsHero.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(imageShape),
  children: PropTypes.node,
  caption: PropTypes.string,
};
