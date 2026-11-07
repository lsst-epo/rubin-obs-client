"use client";

import { Trans } from "react-i18next";
import * as Styled from "./styles";
import { useCarouselContext } from "../../context";

export default function Status() {
  const { active, length } = useCarouselContext();

  return (
    <Styled.Status aria-live="polite">
      <Trans
        i18nKey={"pagination.current-of-total"}
        values={{
          current: active + 1,
          total: length,
        }}
        components={[<span key={0}></span>]}
      />
    </Styled.Status>
  );
}
