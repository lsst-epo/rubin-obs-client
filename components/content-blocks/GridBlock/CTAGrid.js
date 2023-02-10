import PropTypes from "prop-types";
import { Grid } from "@rubin-epo/epo-react-lib";
import Tile from "@/atomic/Tile";

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
