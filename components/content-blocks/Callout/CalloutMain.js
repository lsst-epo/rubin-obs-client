import PropTypes from "prop-types";
import clsx from "clsx";
import { linksShape } from "@/shapes/link";
import Wrapper from "./Wrapper";
import { StyledImage } from "./styles";
import TempList from "@/components/dynamic/TempList";
import { cantoToImageShape } from "@/lib/api/canto";
import RichTextContent from "@/components/atomic/RichTextContent";
import MixedLink from "@rubin-epo/epo-react-lib/MixedLink";
import styles from "./styles.module.css";

export default function CalloutMain({ callout, locale }) {
  const {
    dynamicComponent,
    header,
    cantoAssetSingle,
    links,
    padImage,
    text,
    ...wrapperProps
  } = callout;

  const calloutImage = cantoToImageShape(cantoAssetSingle[0], 800, locale);
  const hasImage = !!calloutImage;

  return (
    <Wrapper
      {...wrapperProps}
      height={dynamicComponent === "alertStream" ? "slim" : ""}
      isImage={hasImage}
    >
      <header className={styles.header}>
        <h2>{header}</h2>
        {text && <RichTextContent className={styles.richText} text={text} />}
        <div className={styles.links} data-has-image={hasImage}>
          {links.map((link, index) => (
            <MixedLink
              {...link.mixedLink}
              key={index}
              className={clsx({
                [styles.link]: true,
                "c-buttonish": true,
                "c-buttonish--educator":
                  wrapperProps.backgroundColor === "orange20",
              })}
            />
          ))}
        </div>
      </header>
      {hasImage && (
        <StyledImage
          role="presentation"
          image={calloutImage}
          $padImage={padImage}
        />
      )}
      {dynamicComponent === "alertStream" && (
        <TempList dynamicComponent={dynamicComponent} />
      )}
    </Wrapper>
  );
}

CalloutMain.propTypes = {
  callout: PropTypes.shape({
    header: PropTypes.string,
    text: PropTypes.node,
    cantoAssetSingle: PropTypes.array,
    padImage: PropTypes.bool,
    links: linksShape,
    backgroundColor: PropTypes.string,
    order: PropTypes.string,
    width: PropTypes.string,
    ratio: PropTypes.string,
    dynamicComponent: PropTypes.string,
  }).isRequired,

  locale: PropTypes.string,
};
