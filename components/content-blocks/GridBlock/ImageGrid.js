import PropTypes from "prop-types";
import { Grid } from "@rubin-epo/epo-react-lib";
import Tile from "@/atomic/Tile";

const CTAGrid = ({ items, limit }) => {
  const cols = limit === 4 ? 4 : 3;

  return (
    <>
      {items.length > 0 && (
        <Grid columns={cols} tablet={3}>
          {items.map(({ id, contentImage, header }) => (
            <Tile
              key={id}
              title={header}
              image={contentImage?.[0]}
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
