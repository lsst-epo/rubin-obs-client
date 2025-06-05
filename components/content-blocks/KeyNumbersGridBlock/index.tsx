import { FC } from "react";
import clsx from "clsx";
import Container from "@rubin-epo/epo-react-lib/Container";
import MixedLink from "@rubin-epo/epo-react-lib/MixedLink";
import { FragmentType, useFragment } from "@/gql";
import {
  KeyNumbersBlockFragmentDoc,
  MixedLinkFragmentFragmentDoc,
} from "@/gql/graphql";
import { isDarkMode } from "@/helpers/styles";
import styles from "./styles.module.css";
import { getPathname } from "@/lib/i18n/navigation";
import { isDefaultLocale } from "@/lib/i18n";

const resizeHeaderFontSize = (header: string | null) => {
  if (header && header.length > 5) return "var(--size-spacing-l)";
};

const resizePostscriptFontSize = (postscript: string | null) => {
  if (postscript && postscript.length > 2) return "var(--size-spacing-m)";
};

const resizeSubheadingFontSize = (subheading: string | null) => {
  if (subheading && subheading.length > 20) return "var(--size-spacing-s)";
};

interface KeyNumbersProps
  extends FragmentType<typeof KeyNumbersBlockFragmentDoc> {
  locale: string;
}

const KeyNumbersBlock: FC<KeyNumbersProps> = ({ locale, ...props }) => {
  const { header, keyNumbers, backgroundColor, fullWidth, mixedLink } =
    useFragment(KeyNumbersBlockFragmentDoc, props);
  const link = useFragment(MixedLinkFragmentFragmentDoc, mixedLink);

  const darkMode = isDarkMode(backgroundColor);

  return (
    <Container
      darkMode={darkMode}
      bgColor={backgroundColor ?? undefined}
      width={fullWidth ? "wide" : "narrow"}
      paddingSize="small"
    >
      {header && <h2 className={styles.header}>{header}</h2>}
      <dl className={styles.keyNumbers}>
        {keyNumbers &&
          keyNumbers.length > 0 &&
          keyNumbers.map((number) => {
            if (
              number?.__typename !==
              "contentBlocks_keyNumbersGridItem_BlockType"
            )
              return null;

            const { id, footer, header, postscript, subheading } = number;

            return (
              <div className={styles.keyNumber} key={id}>
                <dt className={styles.term}>{footer}</dt>
                <dd className={styles.definition}>
                  <div className={styles.number}>
                    <span
                      className={styles.heading}
                      style={{
                        "--size-text-heading-key-numbers":
                          resizeHeaderFontSize(header),
                      }}
                    >
                      {header}
                    </span>
                    {postscript && (
                      <span
                        className={styles.postscript}
                        style={{
                          "--size-text-postscript-key-numbers":
                            resizePostscriptFontSize(postscript),
                        }}
                      >
                        {postscript}
                      </span>
                    )}
                  </div>
                  <div
                    className={styles.subheading}
                    style={{
                      "--size-text-subheading-key-numbers":
                        resizeSubheadingFontSize(subheading),
                    }}
                    dangerouslySetInnerHTML={{
                      __html: subheading || "&nbsp;",
                    }}
                  />
                </dd>
              </div>
            );
          })}
      </dl>
      {link?.url && (
        <MixedLink
          url={link.url}
          type={link.type ?? undefined}
          title={link.title ?? undefined}
          text={link.text ?? undefined}
          customText={link.customText ?? undefined}
          element={
            link.element && link.element.uri
              ? {
                  uri: getPathname({
                    href: { pathname: `/${link.element.uri}` },
                    locale,
                    forcePrefix: !isDefaultLocale(locale),
                  }),
                }
              : undefined
          }
          className={clsx(styles.link, "c-buttonish", "c-buttonish--block")}
        />
      )}
    </Container>
  );
};

KeyNumbersBlock.displayName = "ContentBlock.KeyNumbers";

export default KeyNumbersBlock;
