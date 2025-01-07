"use client";
import styled from "styled-components";
import { fluidScale } from "@/styles/globalStyles";
import Image from "next/image";

export const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: var(--size-width-center, 2000px);
  height: var(--Hero-height, ${fluidScale("540px", "400px")});
  margin: 0 auto;
  overflow: auto;
`;

export const HeroImage = styled(Image)`
  /* stylelint-disable declaration-no-important */
  height: 100% !important;
  object-fit: cover;
  object-position: var(--Hero-object-position, center);
`;
