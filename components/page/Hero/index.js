import PropTypes from "prop-types";
import styled from "styled-components";
import Image from "@/primitives/Image";
import imageShape from "@/shapes/image";
import { fluidScale, containerFullBleed, respond } from "@/styles/globalStyles";

export default function Hero({ data }) {
  const imageData = data && data[0];

  if (!imageData?.url) return null;

  return (
    <StyledHero>
      <StyledImage image={imageData} />
    </StyledHero>
  );
}

const StyledHero = styled.div`
  ${containerFullBleed("CONTAINER_FULL")}
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: ${fluidScale("540px", "400px")};
  object-fit: cover;

  ${respond(`--height: 56.25vw;`)}
`;
Hero.displayName = "Global.Hero";

Hero.propTypes = {
  data: PropTypes.arrayOf(imageShape),
};
