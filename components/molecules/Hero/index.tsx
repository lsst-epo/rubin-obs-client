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

  return (
    <Styled.HeroContainer
      data-cy="hero"
      style={{
        "--Hero-object-position": `${focalPointX || 50}% ${focalPointY || 50}%`,
      }}
      className={className}
    >
      <Styled.HeroImage image={{ ...imageData, priority: true }} />
      {children}
    </Styled.HeroContainer>
  );
};

Hero.displayName = "Molecule.Hero";

export default Hero;
