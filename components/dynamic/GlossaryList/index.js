import { Fragment, useState } from "react";
import groupBy from "lodash/groupBy";
import sortBy from "lodash/sortBy";
import MixedLink from "@/atomic/MixedLink";
import DataList from "@/dynamic/DataList";
import Container from "@/components/layout/Container";
import Columns from "@/components/layout/Columns";
import * as Styled from "./styles";

export default function GlossaryList({ excludeId = null, limit = null }) {
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));
  const [filterChar, setFilteredChar] = useState(null);

  // Sort and group entires by first character
  const getGroupedEntires = (entires) => {
    // Currently lowercase titles are sorted at the end - this makes sure case is ignored
    // TODO: Order with case insensitivity in lib/api/entries.js
    const sorted = sortBy(entires, (o) => o.title.toUpperCase());
    return groupBy(sorted, (o) => o.title[0].toUpperCase());
  };

  const handleClick = (char) => {
    if (filterChar !== char) {
      setFilteredChar(char);
    } else {
      setFilteredChar(null);
    }
  };

  return (
    <Container width="wide">
      <DataList excludeId={excludeId} limit={limit} section="glossaryTerms">
        {({ entries }) => {
          const groupedEntries = getGroupedEntires(entries);
          const charKeys = Object.keys(groupedEntries);

          return (
            <>
              <nav>
                <Styled.AlphaList>
                  {alphabet.map((char) => (
                    <Styled.AlphaItem key={char}>
                      <Styled.AlphaButton
                        disabled={!charKeys.includes(char)}
                        aria-pressed={
                          charKeys.includes(char)
                            ? char === filterChar
                            : undefined
                        }
                        aria-controls={
                          charKeys.includes(char) ? "termColumns" : undefined
                        }
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick(char);
                        }}
                      >
                        {char}
                      </Styled.AlphaButton>
                    </Styled.AlphaItem>
                  ))}
                </Styled.AlphaList>
              </nav>
              <Columns id="termColumns" width={300} gap={25}>
                {charKeys
                  .filter((char) => !filterChar || filterChar === char)
                  .map((char) => (
                    <Styled.TermGroup key={char}>
                      <Styled.TermGroupHeader>{char}</Styled.TermGroupHeader>
                      <Styled.TermList>
                        {groupedEntries[char].map(({ id, title, uri }) => (
                          <li key={id}>
                            <Styled.TermLink as={MixedLink} url={uri}>
                              {title}
                            </Styled.TermLink>
                          </li>
                        ))}
                      </Styled.TermList>
                    </Styled.TermGroup>
                  ))}
              </Columns>
            </>
          );
        }}
      </DataList>
    </Container>
  );
}
