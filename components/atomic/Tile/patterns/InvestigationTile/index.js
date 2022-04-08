import PropTypes from "prop-types";
import { useUID } from "react-uid";
import { useAuthenticationContext } from "@/contexts/Authentication";
import Image from "@/atomic/Image";
import MixedLink from "@/atomic/MixedLink";
import { mixedLinkShape } from "@/shapes/link";
import { useGlobalData } from "@/lib/utils";
import * as Styled from "./styles";

const InvestigationTile = ({ image, link, title, type = "cta" }) => {
  const { isAuthenticated, user } = useAuthenticationContext();

  const uid = useUID();
  const { siteInfo } = useGlobalData();
  const finalImage = image || siteInfo?.siteImage?.[0];
  const isEducator = isAuthenticated && user.group === "educators";

  // TODO: Remove this line. For testing only.
  finalImage.url = "/images/coloring_the_universe.png";
  finalImage.url2x = "/images/coloring_the_universe.png";
  finalImage.url3x = "/images/coloring_the_universe.png";

  typeof link === "string" && (link = { url: link });

  if (!isEducator) {
    link.url = link.element.externalUrl;
  }

  return (
    <Styled.MixedLink
      as={link?.url ? MixedLink : "div"}
      {...link}
      aria-labelledby={link?.url ? uid : null}
      aria-disabled={!link.element.isActive}
    >
      {finalImage && (
        <Styled.Image>
          <Image image={finalImage} />
        </Styled.Image>
      )}
      {title && (
        <Styled.Title id={uid}>
          <span>
            {title}
            {!link.element.isActive && <div>(Coming Soon)</div>}
          </span>
        </Styled.Title>
      )}
    </Styled.MixedLink>
  );
};

InvestigationTile.propTypes = {
  className: PropTypes.string,
  image: PropTypes.object,
  link: PropTypes.oneOfType([PropTypes.string, mixedLinkShape]),
  title: PropTypes.string,
  type: PropTypes.string,
};

export default InvestigationTile;
