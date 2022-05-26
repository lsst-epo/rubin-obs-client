import { Share } from "@/components/atomic";
import Container from "@/layout/Container";

export default function ShareContentBlock() {
  return (
    <Container paddingSize="medium">
      <Share />
    </Container>
  );
}

ShareContentBlock.displayName = "ContentBlock.Share";
