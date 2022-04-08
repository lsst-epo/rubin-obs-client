import PropTypes from "prop-types";
import Grid from "@/layout/Grid";
import Tile from "@/atomic/Tile";
import InvestigationTile from "@/components/atomic/Tile/patterns/InvestigationTile";

const tileMap = {
  investigation: InvestigationTile,
};

const CTAGrid = ({ items, limit }) => {
  const cols = limit === 4 ? 4 : 3;

  const renderTile = ({ id, contentImage, mixedLink }) => {
    const TileBlock = tileMap[mixedLink.element?.typeHandle] || Tile;

    return (
      <TileBlock
        key={id}
        title={mixedLink?.customText || mixedLink?.text}
        image={contentImage?.[0]}
        link={mixedLink}
        type="cta"
      />
    );
  };

  return (
    <>
      {items.length > 0 && (
        <Grid columns={cols} tablet={3}>
          {items.map(renderTile)}
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
