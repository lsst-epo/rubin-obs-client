"use client";
import { Share } from "@/components/atomic";
import { Container } from "@rubin-epo/epo-react-lib";

export default function ShareContentBlock() {
  return (
    <Container paddingSize="medium">
      <Share />
    </Container>
  );
}

ShareContentBlock.displayName = "ContentBlock.Share";
