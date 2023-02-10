import React from "react";
import PropTypes from "prop-types";
import { Container } from "@rubin-epo/epo-react-lib";
import { useGlobalData } from "@/lib/utils";
import * as Styled from "./styles";

const SimpleTable = ({ simpleTable, sites = [] }) => {
  // Think of a cleaner way to handle this site-specific
  // tables visibility blah
  const {
    siteInfo: { language },
  } = useGlobalData();
  const showTable = sites.includes(language);

  if (!showTable) return null;

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
  sites: PropTypes.array,
  simpleTable: PropTypes.array,
};

export default SimpleTable;
