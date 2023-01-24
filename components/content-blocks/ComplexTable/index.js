import PropTypes from "prop-types";
import Container from "@/components/layout/Container";
import { useGlobalData } from "@/lib/utils";
import * as Styled from "./styles";

export default function ComplexTable({
  complexTable,
  plainText,
  verticalAlignment,
  sites = [],
  styleAs = "primary",
  isChild = false,
}) {
  // Think of a cleaner way to handle this site-specific
  // tables visibility blah
  const {
    siteInfo: { language },
  } = useGlobalData();
  const showTable = sites.includes(language);

  const renderTable = () => (
    <Styled.TableWrapper>
      <Styled.Table
        as="table"
        $styleAs={styleAs}
        $verticalAlignment={verticalAlignment}
      >
        {plainText && (
          <Styled.Caption className={isChild && "a-hidden"}>
            {plainText}
          </Styled.Caption>
        )}
        <tbody>
          {complexTable.map((row, i) => (
            <Styled.TableRow key={i}>
              {row.tableRow.map((cell, j) => (
                <Styled.TableCell
                  as={i === 0 ? "th" : "td"}
                  key={cell.id}
                  $row={i + 1}
                  $background={cell.cellBackground}
                  $hasFlexibleCellWidth={cell.hasFlexibleCellWidth}
                  colSpan={cell.cellWidth}
                  dangerouslySetInnerHTML={{ __html: cell.cellContent }}
                />
              ))}
            </Styled.TableRow>
          ))}
        </tbody>
      </Styled.Table>
    </Styled.TableWrapper>
  );

  if (!showTable) return null;

  return isChild ? (
    renderTable()
  ) : (
    <Container width="narrow">{renderTable()}</Container>
  );
}

ComplexTable.propTypes = {
  complexTable: PropTypes.array,
  plainText: PropTypes.string,
  verticalAlignment: PropTypes.string,
  sites: PropTypes.array,
  styleAs: PropTypes.string,
  isChild: PropTypes.bool,
};
