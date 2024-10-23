"use client";
import React, { useState, useRef, Children, cloneElement } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { respond } from "@/styles/globalStyles";
import { IconComposer } from "@rubin-epo/epo-react-lib";

const Tabs = ({ children, labels, defaultTab = 0 }) => {
  const [active, setActive] = useState(defaultTab);
  const tablistRef = useRef();

  const childrenWithPanelProps = Children.map(children, (child, i) => {
    return cloneElement(child, {
      panelProps: {
        role: "tabpanel",
        "aria-hidden": i !== active,
        "aria-labelledby": `tab-${i}`,
        id: `tabpanel-${i}`,
      },
    });
  });

  const handleClick = (i, e) => setActive(i);
  const handleKeyDown = (key) => {
    if (key === 37) tabLeft();
    if (key === 39) tabRight();
  };

  function tabLeft() {
    const buttons = tabbable();
    if (!buttons) return null;
    const focused = document.activeElement;
    const focusableIndex = buttons.indexOf(focused);

    focusableIndex === 0
      ? buttons[buttons.length - 1].focus()
      : buttons[focusableIndex - 1].focus();
  }

  function tabRight() {
    const buttons = tabbable();
    if (!buttons) return null;
    const focused = document.activeElement;
    const focusableIndex = buttons.indexOf(focused);

    focusableIndex === buttons.length - 1
      ? buttons[0].focus()
      : buttons[focusableIndex + 1].focus();
  }

  function tabbable() {
    if (!tablistRef || !tablistRef.current) return null;
    return Array.from(tablistRef.current.querySelectorAll("button"));
  }

  return (
    <TabContainer>
      <TabList
        ref={tablistRef}
        role="tablist"
        aria-label="Featured content"
        onKeyDown={({ which }) => handleKeyDown(which)}
      >
        {Object.keys(labels).map((key, i) => (
          <Tab
            key={i}
            aria-selected={active === i ? "true" : "false"}
            aria-controls={`tabpanel-${i}`}
            className={active === i ? "active" : ""}
            onClick={(e) => handleClick(i, e)}
            role="tab"
            tabIndex={0}
            id={`tab-${i}`}
          >
            <span>{labels[key]}</span>
            <div>
              <IconComposer icon={key} />
            </div>
          </Tab>
        ))}
      </TabList>
      <TabPanel $active={active}>{childrenWithPanelProps}</TabPanel>
    </TabContainer>
  );
};

const TabContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-areas:
    "tablist"
    "tabpanel";
  width: 100%;
  z-index: 5;
`;

const TabList = styled.nav`
  grid-area: tablist;
  display: flex;
  justify-content: center;
`;

const Tab = styled.button`
  cursor: pointer;
  background: var(--neutral80);
  color: var(--white);
  padding: 0.5em 4vw;
  margin: 0 4px;
  position: relative;
  &.active {
    background: var(--black);
  }
  &:focus-visible {
    outline: 1px solid var(--white);
    outline-offset: -1px;
  }
  > div {
    display: none;
    svg {
      width: 40px;
      height: 40px;
    }
  }
  ${respond(`
    flex: 1;
    margin: 0;
    text-align: center;
    border-left: 1px solid var(--black);
    border-right: 1px solid var(--black);
    > span {display: none;}
    > div {display: block;}
  `)}
`;

const TabPanel = styled.div`
  grid-area: tabpanel;
  display: grid;
  grid-template-areas: "content";
  justify-items: center;
  align-items: start;
  ${respond(`align-items: start;`)}
  background-color: var(--black);
  && > * {
    width: 100%;
    overflow-x: hidden;
    grid-area: content;
    z-index: 0;
    opacity: 0;
    padding: 40px 0;
    visibility: hidden;
  }
  ${(p) =>
    `>*:nth-child(${
      p.$active + 1
    }) {z-index: 1; opacity: 1; visibility: visible;}`}
`;

Tabs.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,
  labels: PropTypes.object,
  defaultTab: PropTypes.number,
};

export default Tabs;
