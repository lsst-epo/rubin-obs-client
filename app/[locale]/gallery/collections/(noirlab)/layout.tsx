import { FC, PropsWithChildren } from "react";
import Container from "@rubin-epo/epo-react-lib/Container";
import Stack from "@rubin-epo/epo-react-lib/Stack";
import MediaPolicy from "@/components/organisms/gallery/MediaPolicy";

const NOIRLabAssetLayout: FC<PropsWithChildren<LocaleProps>> = async ({
  children,
  params: { locale },
}) => {
  return (
    <Container width="wide">
      <Stack>
        {children}
        <MediaPolicy {...{ locale }} />
      </Stack>
    </Container>
  );
};

export const dynamic = "force-dynamic";

export default NOIRLabAssetLayout;
