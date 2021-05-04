import PropTypes from "prop-types";
import Grid from "@/layout/Grid";
import Tile from "@/primitives/Tile";

const CTAGrid = ({ items, limit }) => {
  const cols = limit === 4 ? 4 : 3;

  return (
    <>
      {items.length > 0 && (
        <Grid columns={cols} tablet={3}>
          {items.map(({ id, contentImage, mixedLink }) => (
            <Tile
              key={id}
              title={mixedLink?.customText || mixedLink?.text}
              image={contentImage?.[0]}
              link={mixedLink}
              type="cta"
            />
          ))}
        </Grid>
      )}
    </>
  );
};

CTAGrid.propTypes = {
  items: PropTypes.array,
  limit: PropTypes.number,
};

export default CTAGrid;
