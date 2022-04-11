import { InlineShare } from "@/components/atomic/Share";
import Container from "@/layout/Container";

// const SHARETHIS_PROPERTY = process.env.NEXT_PUBLIC_SHARETHIS_PROPERTY;
// Should be replaced with an env var
const SHARETHIS_PROPERTY = "5f57f7661db73a00129d7d03";

export default function ShareContentBlock() {
  if (!SHARETHIS_PROPERTY) return null;
  return (
    <Container paddingSize="medium">
      <InlineShare />
    </Container>
  );
}

ShareContentBlock.displayName = "ContentBlock.Share";
