import styled, { css } from "styled-components";
import { BREAK_MOBILE_MIN, fluidScale, respond } from "@/styles/globalStyles";

export const DateWrapper = styled.div`
  display: flex;
  justify-content: center;
  min-width: 70px;

  ${({ $hasEndDate }) =>
    $hasEndDate
      ? css`
          --date-month-font-size: ${fluidScale("18px", "16px")};
          --date-day-font-size: ${fluidScale("28px", "24px")};
          --date-year-font-size: ${fluidScale("16px", "14px")};
        `
      : css`
          --date-month-font-size: ${fluidScale("22px", "18px")};
          --date-day-font-size: ${fluidScale("40px", "28px")};
          --date-year-font-size: ${fluidScale("20px", "16px")};
        `}

  ${respond(
    css`
      flex-wrap: wrap;
      min-width: auto;
    `,
    BREAK_MOBILE_MIN
  )}
`;

export const Date = styled.div`
  display: inline-flex;
  flex-direction: column;
  line-height: 1;

  > * + * {
    margin-top: 5px;
  }
`;

export const DateMonth = styled.span`
  font-size: var(--date-month-font-size);
  font-weight: 800;
  ${respond(`font-weight: 700;`)}
`;

export const DateDay = styled.span`
  font-size: var(--date-day-font-size);
  font-weight: 800;
`;

export const DateYear = styled.span`
  font-size: var(--date-year-font-size);
  font-weight: 400;
`;

export const DateEmDash = styled.span`
  display: inline-flex;
  align-items: center;
  padding-inline-start: 0.33em;
  padding-inline-end: 0.25em;
`;
