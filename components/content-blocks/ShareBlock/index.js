import { InlineShare } from "@/components/atomic/Share";
import Container from "@/layout/Container";

const SHARETHIS_PROPERTY = process.env.NEXT_PUBLIC_SHARETHIS_PROPERTY;

export default function ShareContentBlock() {
  if (!SHARETHIS_PROPERTY) return null;
  return (
    <Container paddingSize="medium">
      <InlineShare />
    </Container>
  );
}

ShareContentBlock.displayName = "ContentBlock.Share";
