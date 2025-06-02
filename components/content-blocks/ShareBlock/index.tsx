import { FC } from "react";
import Container from "@rubin-epo/epo-react-lib/Container";
import Stack from "@rubin-epo/epo-react-lib/Stack";
import { FragmentType, useFragment } from "@/gql";
import { ShareBlockFragmentDoc } from "@/gql/graphql";
import { useTranslation } from "@/lib/i18n";
import Share from "@/components/molecules/Share";
import SharePopup from "@/components/molecules/SharePopup";
import styles from "./styles.module.css";
import { isDarkMode } from "@/helpers/styles";

interface ShareBlockProps extends FragmentType<typeof ShareBlockFragmentDoc> {
  locale: string;
}

const ShareContentBlock: FC<ShareBlockProps> = async ({ locale, ...props }) => {
  const { t } = await useTranslation(locale);
  const { shareVariant, shareTitle, text, backgroundColor } = useFragment(
    ShareBlockFragmentDoc,
    props
  );

  const isLargeBlock = shareVariant === "large";
  const hasBackgroundColor = typeof backgroundColor === "string";
  const hasOverrideTitle =
    typeof shareTitle === "string" && shareTitle.length > 0;
  const hasOverrideText = typeof text === "string" && text.length > 0;

  const title = hasOverrideTitle ? shareTitle : t("share.callout_cta");

  return (
    <Container
      className={styles.container}
      darkMode={isDarkMode(backgroundColor)}
      bgColor={hasBackgroundColor ? backgroundColor : undefined}
      paddingSize={isLargeBlock ? "medium" : "small"}
    >
      <Stack className={styles.content}>
        {isLargeBlock && (
          <>
            <h3>{title}</h3>
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
        <div className={styles.mobile}>
          <SharePopup
            variant={isLargeBlock ? "block" : "primary"}
            title={title}
          />
          <span>{title}</span>
        </div>
      </Stack>
    </Container>
  );
};

ShareContentBlock.displayName = "ContentBlock.Share";

export default ShareContentBlock;
