"use client";

import { Previous, Next } from "../ArrowButtons";
import Status from "../Status";
import * as Styled from "./styles";
import { SlideItem } from "../../types";
import { useCarouselContext } from "../../context";
import Description from "../Description";
import DownloadLink from "../DownloadLink";

interface Props {
  items: SlideItem[];
  className?: string;
}

export default function Descriptions({ items, className }: Props) {
  const { active, slideIds } = useCarouselContext();
  const imageUrl = items.at(active)?.image?.url;

  return (
    <Styled.SlideDescriptions className={className}>
      <Styled.ControlsTop>
        <Styled.Buttons>
          <Previous />
          <Next />
        </Styled.Buttons>
        <Status />
      </Styled.ControlsTop>
      {items.map((item, i) => (
        <Description
          key={item.id || i}
          title={item.title}
          description={item.description}
          teaser={item.teaser}
          inert={i !== active}
          imageUrl={item.image?.url}
          id={`${slideIds.at(i)}_description`}
          index={i}
        />
      ))}
      <Styled.ControlsBottom>
        <Styled.Buttons>
          <Previous />
          <Next />
          <Status />
        </Styled.Buttons>
        {imageUrl && (
          <div>
            <DownloadLink imageUrl={imageUrl} />
          </div>
        )}
      </Styled.ControlsBottom>
    </Styled.SlideDescriptions>
  );
}
