import PropTypes from "prop-types";
import useCarousel from "@/hooks/useCarousel";
import CarouselContext from "../context";

function Provider({ carouselOptions, children }) {
  const value = useCarousel(carouselOptions);

  return (
    <CarouselContext.Provider value={value}>
      {children}
    </CarouselContext.Provider>
  );
}

Provider.displayName = "Carousel.Provider";

Provider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  carouselOptions: PropTypes.object,
};

export default Provider;
