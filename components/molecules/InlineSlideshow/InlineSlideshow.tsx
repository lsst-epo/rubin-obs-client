"use client";
import { Container } from "@rubin-epo/epo-react-lib";
import {
  Descriptions,
  Provider,
  Slide,
  Slider,
  Wrapper,
} from "@/components/layout/Slideshow";

interface Props {
  items?: {
    description?: string | null;
    teaser?: string | null;
    title?: string | null;
    id?: string | null;
    image?: {
      altText?: string | null;
      width?: number | null;
      height?: number | null;
      url?: string | null;
    }[];
  }[];
}

export default function InlineSlideshow({ items = [] }: Props) {
  const slides = items.map((item, i) => {
    return {
      ...item,
      image: {
        ...item.image?.[0],
      },
    };
  });

  return (
    <>
      <Container width="wide" bgColor={"black"}>
        <Provider
          options={{
            length: slides.length,
          }}
        >
          <Wrapper>
            <Slider>
              {slides.map((item, i) => {
                return (
                  <Slide index={i} image={item.image} key={item.id || `${i}`} />
                );
              })}
            </Slider>
            <Descriptions items={slides} />
          </Wrapper>
        </Provider>
      </Container>
    </>
  );
}
