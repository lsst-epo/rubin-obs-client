import { FC } from "react";
import Image from "next/image";
import { FragmentType, useFragment } from "@/gql";
import {
  CalloutMainFragmentDoc,
  LinksFragmentFragmentDoc,
} from "@/gql/graphql";
import clsx from "clsx";
import Wrapper from "../Wrapper";
import TempList from "@/components/dynamic/TempList";
import { cantoToImageProps } from "@/lib/api/canto";
import MixedLink from "@rubin-epo/epo-react-lib/MixedLink";
import RichTextContent from "@/components/atomic/RichTextContent";

import styles from "../styles.module.css";

interface CalloutMainProps {
  callout: FragmentType<typeof CalloutMainFragmentDoc>;
  locale: string;
}

const CalloutLink: FC<
  FragmentType<typeof LinksFragmentFragmentDoc> & { educator?: boolean }
> = ({ educator = false, ...props }) => {
  const { mixedLink } = useFragment(LinksFragmentFragmentDoc, props);

  if (!mixedLink) return null;

  const { url, title, text, type, customText, element } = mixedLink;

  if (!url) return null;

  return (
    <MixedLink
      url={url}
      title={title ?? undefined}
      text={text ?? undefined}
      type={type ?? undefined}
      customText={customText ?? undefined}
      element={element?.uri ? { uri: element.uri } : undefined}
      className={clsx({
        [styles.link]: true,
        "c-buttonish": true,
        "c-buttonish--educator": educator,
      })}
    />
  );
};

const CalloutMain: FC<CalloutMainProps> = ({ locale, callout }) => {
  const {
    dynamicComponent,
    header,
    cantoAssetSingle,
    links,
    padImage,
    text,
    backgroundColor,
    order,
    ratio,
    width,
  } = useFragment(CalloutMainFragmentDoc, callout);

  const hasImage = !!cantoAssetSingle[0];
  const calloutImage = hasImage
    ? cantoToImageProps(cantoAssetSingle[0], {
        locale,
        usePreviewUrl: true,
      })
    : undefined;

  return (
    <Wrapper
      backgroundColor={backgroundColor ?? undefined}
      order={order ?? undefined}
      ratio={ratio ?? undefined}
      width={width ?? undefined}
      height={dynamicComponent === "alertStream" ? "slim" : ""}
      isImage={hasImage}
    >
      <header className={styles.header}>
        <h2>{header}</h2>
        {text && <RichTextContent className={styles.richText} text={text} />}
        <div className={styles.links} data-has-image={hasImage}>
          {links?.map((link, index) => (
            <CalloutLink
              key={index}
              educator={backgroundColor === "orange20"}
              {...link}
            />
          ))}
        </div>
      </header>
      {calloutImage && (
        <Image
          {...calloutImage}
          data-pad-image={padImage}
          className={styles.image}
        />
      )}
      {dynamicComponent === "alertStream" && (
        <TempList dynamicComponent={dynamicComponent} />
      )}
    </Wrapper>
  );
};

CalloutMain.displayName = "ContentBlock.Callout.Main";

export default CalloutMain;
