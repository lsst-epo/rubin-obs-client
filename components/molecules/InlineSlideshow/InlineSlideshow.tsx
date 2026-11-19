"use client";
import { Container } from "@rubin-epo/epo-react-lib";
import {
  Descriptions,
  Provider,
  Slide,
  Slider,
  Wrapper,
  useSlideshowSlides,
} from "@/components/layout/Slideshow";
import { FragmentType } from "@/gql";
import { SlideshowSlidesFragmentDoc } from "@/gql/graphql";

interface Props {
  slideshow: FragmentType<typeof SlideshowSlidesFragmentDoc>;
}

export default function InlineSlideshow({ slideshow }: Props) {
  const { slides } = useSlideshowSlides(slideshow);

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
