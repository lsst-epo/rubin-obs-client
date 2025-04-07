"use client";
import PropTypes from "prop-types";
import { Container } from "@rubin-epo/epo-react-lib";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";
import { useGlobalData } from "@/lib/utils";
import ComplexTable from "../ComplexTable";
import * as Styled from "./styles";

export default function TableGroup({ sites = [], items }) {
  // Think of a cleaner way to handle this site-specific
  // tables visibility blah
  const {
    siteInfo: { language },
  } = useGlobalData();
  const showTable = sites.includes(language);

  if (!showTable) return null;

  return (
    <Container width="wide">
      <TabGroup>
        <TabList as={Styled.TabList}>
          {items.map(({ plainText }, i) => (
            <Tab as={Styled.Tab} key={`tab${i}`}>
              {plainText}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {items.map(
            ({ complexTable, sites, plainText, verticalAlignment }, i) => (
              <TabPanel key={`panel${i}`}>
                <ComplexTable
                  sites={sites}
                  complexTable={complexTable}
                  plainText={plainText}
                  verticalAlignment={verticalAlignment}
                  styleAs="secondary"
                  isChild
                />
              </TabPanel>
            )
          )}
        </TabPanels>
      </TabGroup>
    </Container>
  );
}

TableGroup.propTypes = {
  sites: PropTypes.array,
  items: PropTypes.array,
};
