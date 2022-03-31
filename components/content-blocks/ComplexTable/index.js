import Container from "@/components/layout/Container";
import * as Styled from "./styles";

export default function ComplexTable({
  complexTable,
  plainText,
  styleAs = "primary",
  isChild = false,
}) {
  const renderTable = () => (
    <Styled.TableWrapper>
      <Styled.Table as="table" $styleAs={styleAs}>
        <caption className="a-hidden">{plainText}</caption>
        {complexTable.map((row, i) => (
          <Styled.TableRow key={i} as="tr">
            {row.tableRow.map((cell, j) => (
              <Styled.TableCell
                as="td"
                key={cell.id}
                $row={i + 1}
                $colWidth={cell.cellWidth}
                $background={cell.cellBackground}
                dangerouslySetInnerHTML={{ __html: cell.cellContent }}
              />
            ))}
          </Styled.TableRow>
        ))}
      </Styled.Table>
    </Styled.TableWrapper>
  );

  return isChild ? (
    renderTable()
  ) : (
    <Container width="narrow">{renderTable()}</Container>
  );
}
