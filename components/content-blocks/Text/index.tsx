import { FC } from "react";
import Container from "@rubin-epo/epo-react-lib/Container";
import { FragmentType, useFragment } from "@/gql";
import { TextBlockFragmentDoc } from "@/gql/graphql";
import RichTextContent from "@/components/atomic/RichTextContent";
import { isDarkMode } from "@/helpers/styles";

interface TextBlockProps extends FragmentType<typeof TextBlockFragmentDoc> {
  locale: string;
}

const TextContentBlock: FC<TextBlockProps> = (props) => {
  const { text, backgroundColor } = useFragment(TextBlockFragmentDoc, props);

  if (!text) return null;

  return (
    <Container
      darkMode={isDarkMode(backgroundColor)}
      bgColor={backgroundColor || undefined}
      paddingSize="medium"
    >
      <RichTextContent text={text} />
    </Container>
  );
};

TextContentBlock.displayName = "ContentBlock.Text";

export default TextContentBlock;
