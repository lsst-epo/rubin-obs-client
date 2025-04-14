"use client";
import { Radio, RadioGroup } from "@headlessui/react";
import clsx from "clsx";
import {
  PropsWithChildren,
  Children,
  ComponentPropsWithoutRef,
  ElementType,
  useState,
  useRef,
  UIEventHandler,
} from "react";
import styles from "./styles.module.css";
import { useTranslation } from "react-i18next";

type ScrollCarouselProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

const ScrollCarousel = <T extends ElementType>({
  as,
  className,
  children,
  ...props
}: PropsWithChildren<ScrollCarouselProps<T>>) => {
  const { t } = useTranslation();
  const [activeItem, setActiveItem] = useState(0);
  const [scrollUpdatesBlocked, setScrollUpdatesBlocked] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const Component: ElementType = as || "div";
  const count = Children.count(children);
  const options = new Array(count).fill(null);

  const goToItem = (index: number) => {
    if (ref.current) {
      const children = Array.from(ref.current.children);

      children[index].scrollIntoView(false);
      setScrollUpdatesBlocked(true);
      setActiveItem(index);
    }
  };

  const onScroll: UIEventHandler<HTMLElement> = (event) => {
    const { scrollLeft, clientWidth } = event.target as HTMLElement;

    const scrolledIndex = Math.round(scrollLeft / clientWidth);

    if (scrolledIndex !== activeItem) {
      if (!scrollUpdatesBlocked) {
        setActiveItem(scrolledIndex);
      }
    } else {
      if (scrollUpdatesBlocked) {
        setScrollUpdatesBlocked(false);
      }
    }
  };

  return (
    <div className={clsx(styles.container, className)}>
      <Component
        {...props}
        ref={ref}
        className={styles.scrollContainer}
        onScroll={onScroll}
        data-cy="scroll-carousel"
      >
        {children}
      </Component>
      <RadioGroup
        value={activeItem}
        onChange={(value) => goToItem(value)}
        className={styles.mobileNavigation}
      >
        {options.map((o, i) => {
          return (
            <Radio
              value={i}
              className={styles.dotButton}
              aria-label={t("scroll_carousel.label", { value: activeItem })}
              key={i}
            />
          );
        })}
      </RadioGroup>
    </div>
  );
};

ScrollCarousel.displayName = "Molecule.ScrollCarousel";

export default ScrollCarousel;
