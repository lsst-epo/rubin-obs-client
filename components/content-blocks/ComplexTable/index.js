"use client";
import PropTypes from "prop-types";
import BaseComplexTable from "@rubin-epo/epo-react-lib/ComplexTable";
import { useGlobalData } from "@/lib/utils";

export default function ComplexTable({ sites = [], ...props }) {
  // Think of a cleaner way to handle this site-specific
  // tables visibility blah
  const {
    siteInfo: { language },
  } = useGlobalData();
  const showTable = sites.includes(language);

  return showTable ? <BaseComplexTable {...props} /> : null;
}

ComplexTable.propTypes = {
  complexTable: PropTypes.array.isRequired,
  plainText: PropTypes.string,
  verticalAlignment: PropTypes.string,
  sites: PropTypes.array,
  styleAs: PropTypes.string,
  isChild: PropTypes.bool,
};
