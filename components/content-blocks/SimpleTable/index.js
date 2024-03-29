import React from "react";
import PropTypes from "prop-types";
import * as EPOLib from "@rubin-epo/epo-react-lib";
import { useGlobalData } from "@/lib/utils";

const SimpleTable = ({ simpleTable, sites = [] }) => {
  // Think of a cleaner way to handle this site-specific
  // tables visibility blah
  const {
    siteInfo: { language },
  } = useGlobalData();
  const showTable = sites.includes(language);

  return showTable ? <EPOLib.SimpleTable {...{ simpleTable }} /> : null;
};

SimpleTable.propTypes = {
  sites: PropTypes.array,
  simpleTable: PropTypes.array.isRequired,
};

export default SimpleTable;
