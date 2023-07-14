import PropTypes from "prop-types";
import styled from "styled-components";
import { Image } from "@rubin-epo/epo-react-lib";
import imageShape from "@/shapes/image";
import { fluidScale, containerFullBleed } from "@/styles/globalStyles";

export default function Hero({ data, className, children }) {
  const imageData = data && data[0];

  if (!imageData?.url) return null;

  return (
    <StyledHero className={className}>
      <StyledImage role="presentation" image={imageData} />
      {children}
    </StyledHero>
  );
}

const StyledHero = styled.div`
  ${containerFullBleed("CONTAINER_FULL")}
  position: relative;
  height: var(--Hero-height, ${fluidScale("540px", "400px")});
  overflow: auto;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: var(--Hero-object-position, center);
  transform: var(--Hero-transform);
`;
Hero.displayName = "Global.Hero";

Hero.propTypes = {
  data: PropTypes.arrayOf(imageShape),
  children: PropTypes.node,
  className: PropTypes.string,
};
