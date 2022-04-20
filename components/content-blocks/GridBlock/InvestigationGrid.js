import PropTypes from "prop-types";
import Grid from "@/layout/Grid";
import { InvestigationTile } from "@/components/atomic";

const InvestigationGrid = ({ items = [] }) => {
  return (
    <>
      {items?.length > 0 && (
        <Grid columns={3} tablet={3}>
          {items.map(({ id, investigation, useExternalLink }) => (
            <InvestigationTile
              key={id}
              investigation={investigation?.[0]}
              useExternalLink={useExternalLink}
            />
          ))}
        </Grid>
      )}
    </>
  );
};

InvestigationGrid.propTypes = {
  items: PropTypes.array,
};

export default InvestigationGrid;
