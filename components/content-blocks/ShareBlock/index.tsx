import { FC } from "react";
import Container from "@rubin-epo/epo-react-lib/Container";
import Stack from "@rubin-epo/epo-react-lib/Stack";
import { FragmentType, useFragment } from "@/gql";
import { ShareBlockFragmentDoc } from "@/gql/graphql";
import { useTranslation } from "@/lib/i18n";
import Share from "@/components/molecules/Share";
import SharePopup from "@/components/molecules/SharePopup";
import styles from "./styles.module.css";

interface ShareBlockProps extends FragmentType<typeof ShareBlockFragmentDoc> {
  locale: string;
}

const ShareContentBlock: FC<ShareBlockProps> = async ({ locale, ...props }) => {
  const { t } = await useTranslation(locale);
  const { shareVariant, text, backgroundColor } = useFragment(
    ShareBlockFragmentDoc,
    props
  );

  const isLargeBlock = shareVariant === "large";
  const hasBackgroundColor =
    isLargeBlock && typeof backgroundColor === "string";
  const isDark = hasBackgroundColor && backgroundColor.includes("invert");
  const hasOverrideText = typeof text === "string" && text.length > 0;

  return (
    <Container
      className={styles.container}
      bgColor={hasBackgroundColor ? backgroundColor : undefined}
      paddingSize={isLargeBlock ? "medium" : "small"}
      elAttributes={{
        style: {
          color: isDark && "var(--color-font-invert)",
        },
      }}
    >
      <Stack className={styles.content}>
        {isLargeBlock && (
          <>
            <h3>{t("share.callout_cta")}</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: hasOverrideText ? text : t("share.callout_text"),
              }}
            />
          </>
        )}
        <Share
          className={styles.large}
          variant={isLargeBlock ? shareVariant : "primary"}
        />
        <SharePopup
          variant={isLargeBlock ? "block" : "primary"}
          className={styles.mobile}
        />
      </Stack>
    </Container>
  );
};

ShareContentBlock.displayName = "ContentBlock.Share";

export default ShareContentBlock;
