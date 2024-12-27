import { FunctionComponent, PropsWithChildren } from "react";
import * as Styled from "./styles";

interface HeroProps {
  data: Array<any>;
  focalPointX?: number;
  focalPointY?: number;
  className?: string;
}
const Hero: FunctionComponent<PropsWithChildren<HeroProps>> = ({
  data,
  focalPointX = 50,
  focalPointY = 50,
  className,
  children,
}) => {
  const imageData = data && data[0];

  if (!imageData?.url) return null;

  const { width, height, url: src, altText: alt = "" } = imageData;

  return (
    <Styled.HeroContainer data-cy="hero" className={className}>
      <Styled.HeroImage
        {...{ width, height, src, alt }}
        style={{
          "--Hero-object-position": `${focalPointX || 50}% ${
            focalPointY || 50
          }%`,
        }}
        sizes={`(max-width: 2000px) 100vw, 2000px`}
        priority
        fetchPriority="high"
        quality={90}
      />
      {children}
    </Styled.HeroContainer>
  );
};

Hero.displayName = "Molecule.Hero";

export default Hero;
