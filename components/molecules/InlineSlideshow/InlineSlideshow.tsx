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
import styles from "./styles.module.css";
import { isDarkMode } from "@/helpers/styles";

interface Props {
  slideshow: FragmentType<typeof SlideshowSlidesFragmentDoc>;
  bgColor?: string | null;
}

export default function InlineSlideshow({ slideshow, ...props }: Props) {
  const { slides } = useSlideshowSlides(slideshow);

  const bgColor = props.bgColor || "black";

  const darkMode = isDarkMode(bgColor);

  return (
    <Container
      width="wide"
      bgColor={bgColor}
      className={styles.container}
      darkMode={darkMode}
    >
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
  );
}
