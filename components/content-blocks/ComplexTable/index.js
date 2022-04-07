import Container from "@/components/layout/Container";
import * as Styled from "./styles";

export default function ComplexTable({
  complexTable,
  plainText,
  verticalAlignment,
  styleAs = "primary",
  isChild = false,
}) {
  const renderTable = () => (
    <Styled.TableWrapper>
      <Styled.Table
        as="table"
        $styleAs={styleAs}
        $verticalAlignment={verticalAlignment}
      >
        {plainText && <caption className="a-hidden">{plainText}</caption>}
        <tbody>
          {complexTable.map((row, i) => (
            <Styled.TableRow key={i}>
              {row.tableRow.map((cell, j) => (
                <Styled.TableCell
                  as={i === 0 ? "th" : "td"}
                  key={cell.id}
                  $row={i + 1}
                  $background={cell.cellBackground}
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

  return isChild ? (
    renderTable()
  ) : (
    <Container width="narrow">{renderTable()}</Container>
  );
}
