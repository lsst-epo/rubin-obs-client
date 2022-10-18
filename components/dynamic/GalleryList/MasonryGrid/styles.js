import styled from "styled-components";
import IconComposer from "@/components/svg/IconComposer";
import CantoMedia from "@/atomic/CantoMedia";
import { containerRegular } from "@/styles/globalStyles";

export const TileLink = styled.a`
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background-color: var(--neutral20);
  transition: filter 0.2s, opacity 0.2s;

  &:hover,
  &:focus-visible {
    filter: invert(25%) sepia(80%) saturate(102%) hue-rotate(130deg)
      brightness(100%) contrast(100%);
    opacity: 0.7;
  }
`;

export const SkeletonTile = styled.div`
  aspect-ratio: 16 / 9;
  background-color: var(--neutral20);
`;

export const Image = styled(CantoMedia)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const Icon = styled(IconComposer)`
  position: absolute;
  display: block;
  width: 6%;
  height: auto;
  min-width: 40px;
  min-height: 40px;
  color: var(--white);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Grid = styled.div`
  --gap: 1rem;

  ${containerRegular()}
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap);

  ${(props) => props.$childSizes}

  > * {
    flex-grow: 1;
    min-width: 200px;
    max-height: 400px;
  }
`;
