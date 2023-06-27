import PropTypes from "prop-types";
import * as EPOLib from "@rubin-epo/epo-react-lib";
import { useGlobalData } from "@/lib/utils";

export default function ComplexTable({ sites = [], ...props }) {
  // Think of a cleaner way to handle this site-specific
  // tables visibility blah
  const {
    siteInfo: { language },
  } = useGlobalData();
  const showTable = sites.includes(language);

  return showTable ? <EPOLib.ComplexTable {...props} /> : null;
}

ComplexTable.propTypes = {
  complexTable: PropTypes.array.isRequired,
  plainText: PropTypes.string,
  verticalAlignment: PropTypes.string,
  sites: PropTypes.array,
  styleAs: PropTypes.string,
  isChild: PropTypes.bool,
};
