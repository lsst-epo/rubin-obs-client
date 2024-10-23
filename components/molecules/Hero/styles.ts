"use client";
import styled from "styled-components";
import { fluidScale } from "@/styles/globalStyles";
import Image from "@rubin-epo/epo-react-lib/Image";

export const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: var(--Hero-height, ${fluidScale("540px", "400px")});
  overflow: hidden;
  position: relative;
`;

export const HeroImage = styled(Image)`
  color: transparent;
  background-image: var(--image-background-hero, none);
  background-size: cover;
  background-position: var(--Hero-object-position, center);
  background-repeat: no-repeat;

  width: unset;
  height: unset;
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
  object-position: var(--Hero-object-position, center);
`;
