import React from "react";
import PropTypes from "prop-types";
import Carousel from "@/atomic/Carousel";

function CarouselLayout({ children, carouselOptions = {}, className }) {
  if (!children) return null;

  return (
    <Carousel.Provider carouselOptions={carouselOptions}>
      <Carousel.Wrapper className={className}>
        <Carousel.Status />
        <Carousel.PrevButton />
        <Carousel.Carousel>
          {React.Children.map(children, (child, index) => {
            if (React.isValidElement(child)) {
              return (
                <Carousel.Slide key={index}>
                  {React.cloneElement(child)}
                </Carousel.Slide>
              );
            }
          })}
        </Carousel.Carousel>
        <Carousel.NextButton />
        <Carousel.Pager />
      </Carousel.Wrapper>
    </Carousel.Provider>
  );
}

CarouselLayout.displayName = "Layout.Carousel";

CarouselLayout.propTypes = {
  children: PropTypes.node,
  carouselOptions: PropTypes.object,
  className: PropTypes.string,
};

export default CarouselLayout;
