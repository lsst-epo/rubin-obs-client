interface CarouselOptions {
  adaptiveHeight?: boolean;
  initialIndex?: number;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  wrapAround?: boolean;
  length?: number;
}

type CarouselProps = {
  "aria-roledescription": string;
  ref: React.Ref<HTMLDivElement>;
} & ({ "aria-label": string } | { "aria-labelledby": string });

interface SliderProps {
  ref: React.Ref<HTMLDivElement>;
  id: string;
}

interface SlideProps {
  "aria-roledescription": string;
}

interface CarouselButtonProps {
  "aria-controls": string;
  "aria-disabled": boolean;
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

interface PageDotProps {
  "aria-controls": string;
}

interface CarouselConfig {
  active: number;
  setActive: (index: number) => void;
  length: number;
  carouselProps: CarouselProps;
  sliderProps: SliderProps;
  slideProps: SlideProps;
  prevButtonProps: CarouselButtonProps;
  nextButtonProps: CarouselButtonProps;
  pageDotProps: PageDotProps;
  slideIds: string[];
}

type SlideItem = {
  description?: string | null;
  teaser?: string | null;
  title?: string | null;
  id?: string | null;
  image?: {
    altText?: string | null;
    width?: number | null;
    height?: number | null;
    url?: string | null;
  };
};

export type { CarouselOptions, CarouselConfig, SlideItem };
