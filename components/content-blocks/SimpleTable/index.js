import React from "react";
import PropTypes from "prop-types";
import Container from "@/components/layout/Container";
import * as Styled from "./styles";

const SimpleTable = ({ simpleTable }) => {
  return (
    <Container width="narrow">
      <Styled.List>
        {simpleTable.map((row, i) => (
          <React.Fragment key={i}>
            <Styled.Title
              $color={row.rowColor}
              className="c-content-rte"
              dangerouslySetInnerHTML={{ __html: row.rowTitle }}
            />
            <Styled.Description
              $color={row.rowColor}
              className="c-content-rte"
              dangerouslySetInnerHTML={{ __html: row.rowContent }}
            />
          </React.Fragment>
        ))}
      </Styled.List>
    </Container>
  );
};

SimpleTable.propTypes = {
  simpleTable: PropTypes.array,
};

export default SimpleTable;
