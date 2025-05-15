import Container from "@rubin-epo/epo-react-lib/Container";
import { FC } from "react";
import { FragmentType, useFragment } from "@/gql";
import { FirstLookWidgetsBlockFragmentDoc } from "@/gql/graphql";
import { isDarkMode } from "@/helpers/styles";
import FilmReel from "@/components/organisms/FirstLookWidgets/FilmReel";
import SizeComparison from "@/components/organisms/FirstLookWidgets/SizeComparison";
import IconGroup from "@/components/organisms/FirstLookWidgets/IconGroup";
import GalaxyDistance from "@/components/organisms/FirstLookWidgets/GalaxyDistance";
import RichTextContent from "@/components/atomic/RichTextContent";
import Share from "@/components/molecules/Share";

interface FirstLookWidgetsBlockProps
  extends FragmentType<typeof FirstLookWidgetsBlockFragmentDoc> {
  locale: string;
}

const Widgets = {
  filmReel: FilmReel,
  imageSizeComparison: SizeComparison,
  icons: IconGroup,
  colorDistance: GalaxyDistance,
};

const FirstLookWidgetsBlock: FC<FirstLookWidgetsBlockProps> = ({
  locale,
  ...props
}) => {
  const { backgroundColor, firstLookWidget, filmReel } = useFragment(
    FirstLookWidgetsBlockFragmentDoc,
    props
  );

  if (!firstLookWidget) return null;

  const Widget = Widgets[firstLookWidget];

  if (!Widget) return null;

  return (
    <Container
      darkMode={isDarkMode(backgroundColor)}
      bgColor={backgroundColor || undefined}
    >
      <Widget
        locale={locale}
        items={filmReel.map((item) => {
          if (!item) return null;

          const { text, share } = item;

          if (!text) return null;

          return (
            <>
              <RichTextContent text={text} />
              {share && <Share />}
            </>
          );
        })}
      />
    </Container>
  );
};

FirstLookWidgetsBlock.displayName = "ContentBlock.FirstLookWidgets";

export default FirstLookWidgetsBlock;
