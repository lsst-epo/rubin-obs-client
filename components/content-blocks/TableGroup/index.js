import PropTypes from "prop-types";
import Container from "@/components/layout/Container";
import { Tab } from "@headlessui/react";
import ComplexTable from "../ComplexTable";
import * as Styled from "./styles";

export default function TableGroup({ items }) {
  return (
    <Container width="wide">
      <Tab.Group>
        <Tab.List as={Styled.TabList}>
          {items.map(({ plainText }, i) => (
            <Tab as={Styled.Tab} key={`tab${i}`}>
              {plainText}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {items.map(({ complexTable, plainText, verticalAlignment }, i) => (
            <Tab.Panel key={`panel${i}`}>
              <ComplexTable
                complexTable={complexTable}
                plainText={plainText}
                verticalAlignment={verticalAlignment}
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

TableGroup.propTypes = {
  items: PropTypes.array,
};
