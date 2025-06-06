import { FC } from "react";
import Container from "@rubin-epo/epo-react-lib/Container";
import Stack from "@rubin-epo/epo-react-lib/Stack";
import { FragmentType, useFragment } from "@/gql";
import { ShareBlockFragmentDoc } from "@/gql/graphql";
import Share from "@/components/molecules/Share";
import SharePopup from "@/components/molecules/SharePopup";
import styles from "./styles.module.css";
import { isDarkMode } from "@/helpers/styles";

interface ShareBlockProps extends FragmentType<typeof ShareBlockFragmentDoc> {
  locale: string;
}

const ShareContentBlock: FC<ShareBlockProps> = async (props) => {
  const { shareVariant, shareTitle, text, backgroundColor } = useFragment(
    ShareBlockFragmentDoc,
    props
  );

  const isLargeBlock = shareVariant === "large";
  const hasBackgroundColor = typeof backgroundColor === "string";

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
            {shareTitle && <h3>{shareTitle}</h3>}
            {text && (
              <div
                dangerouslySetInnerHTML={{
                  __html: text,
                }}
              />
            )}
          </>
        )}
        <Share
          className={styles.large}
          variant={isLargeBlock ? shareVariant : "primary"}
        />
        <div className={styles.mobile}>
          <SharePopup
            variant={isLargeBlock ? "block" : "primary"}
            title={shareTitle ?? undefined}
          />
          {shareTitle && <span>{shareTitle}</span>}
        </div>
      </Stack>
    </Container>
  );
};

ShareContentBlock.displayName = "ContentBlock.Share";

export default ShareContentBlock;
