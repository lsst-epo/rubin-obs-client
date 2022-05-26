import PropTypes from "prop-types";
import styled from "styled-components";
import {
  BREAK_PHABLET_MIN,
  BREAK_TABLET,
  layoutGrid,
} from "@/styles/globalStyles";

const Grid = ({ children, showFeature = false, columns = 3, tablet = 1 }) => {
  return (
    <StyledGrid columns={columns} showFeature={showFeature} tablet={tablet}>
      {children}
    </StyledGrid>
  );
};

const StyledGrid = styled.ul`
  ${(p) => `${layoutGrid(p.columns)}
    @media (min-width: ${BREAK_PHABLET_MIN}) and (max-width: ${BREAK_TABLET}) {
      grid-template-columns: repeat(${p.tablet}, 1fr);
      > * {grid-column: span 1;}
    }    
  `}

  ${(p) =>
    p.showFeature
      ? `    > :first-child {
      grid-column: 1 / -1;
      }`
      : ``}
`;

Grid.propTypes = {
  columns: PropTypes.number,
  tablet: PropTypes.number,
  showFeature: PropTypes.bool,
  children: PropTypes.node,
};

export default Grid;
