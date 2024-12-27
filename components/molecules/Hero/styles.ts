"use client";
import styled from "styled-components";
import { fluidScale } from "@/styles/globalStyles";
import Image from "next/image";

export const HeroContainer = styled.div`
  width: 100%;
  max-width: var(--size-width-center, 2000px);
  margin: 0 auto;
  position: relative;
  height: var(--Hero-height, ${fluidScale("540px", "400px")});
  overflow: auto;
`;

export const HeroImage = styled(Image)`
  /* stylelint-disable declaration-no-important */
  height: 100% !important;
  object-fit: cover;
  object-position: var(--Hero-object-position, center);
`;
