"use client";
import styled from "styled-components";
import { containerNarrow, respond, tokens } from "@/styles/globalStyles";

export const Container = styled.section`
  ${({ $floatDirection }) =>
    $floatDirection === "right" || $floatDirection === "left"
      ? respond(
          `
        float: ${$floatDirection};
        inline-size: 50%;

        > figure {
          ${containerNarrow()}
          max-inline-size: calc(var(--max-width) * 0.5);
          margin-inline-${$floatDirection === "right" ? "start" : "end"}: 0;
          padding-inline: ${tokens.PADDING_MEDIUM};
          padding-block-start: ${tokens.PADDING_MEDIUM};
        }
        `,
          tokens.BREAK_TABLET_MIN,
          "min"
        )
      : ``}
`;
