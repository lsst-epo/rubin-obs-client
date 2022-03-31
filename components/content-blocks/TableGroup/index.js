import Container from "@/components/layout/Container";
import { Tab } from "@headlessui/react";
import ComplexTable from "../ComplexTable";
import * as Styled from "./styles";

export default function TableGroup({ items }) {
  return (
    <Container width="regular">
      <Tab.Group>
        <Tab.List as={Styled.TabList}>
          {items.map(({ plainText }, i) => (
            <Tab as={Styled.Tab} key={`tab${i}`}>
              {plainText}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {items.map(({ complexTable, plainText }, i) => (
            <Tab.Panel key={`panel${i}`}>
              <ComplexTable
                complexTable={complexTable}
                plainText={plainText}
                styleAs="secondary"
                isChild
              />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </Container>
  );
}
