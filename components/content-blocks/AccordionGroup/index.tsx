import { FC } from "react";
import Accordion from "@rubin-epo/epo-react-lib/Accordion";
import Container from "@rubin-epo/epo-react-lib/Container";
import Stack from "@rubin-epo/epo-react-lib/Stack";
import { FragmentType, useFragment } from "@/gql";
import { AccordionGroupBlockFragmentDoc } from "@/gql/graphql";
import { isDarkMode } from "@/helpers/styles";
import RichTextContent from "@/components/atomic/RichTextContent";
import styles from "./styles.module.css";

interface AccordionGroupProps
  extends FragmentType<typeof AccordionGroupBlockFragmentDoc> {
  locale: string;
}

const AccordionGroup: FC<AccordionGroupProps> = (props) => {
  const { header, accordions, backgroundColor } = useFragment(
    AccordionGroupBlockFragmentDoc,
    props
  );

  const darkMode = isDarkMode(backgroundColor);

  return (
    <Container
      darkMode={darkMode}
      bgColor={backgroundColor || undefined}
      className={styles.container}
    >
      {header && <h2>{header}</h2>}
      <Stack space="var(--size-spacing-m-l)">
        {accordions?.map((accordion) => {
          if (
            !accordion ||
            accordion.__typename !== "contentBlocks_accordion_BlockType"
          )
            return null;

          const { id, header, text } = accordion;

          if (!header) return null;

          return (
            <Accordion key={id} summary={header}>
              {text && <RichTextContent text={text} />}
            </Accordion>
          );
        })}
      </Stack>
    </Container>
  );
};

AccordionGroup.displayName = "ContentBlock.AccordionGroup";

export default AccordionGroup;
