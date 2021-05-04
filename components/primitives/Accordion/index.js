import PropTypes from "prop-types";
import styled from "styled-components";
import { applyTypeScale } from "@/styles/globalStyles";
export default function Accordion({ summary, children }) {
  return (
    <details>
      <Summary>{summary}</Summary>
      <Details>{children}</Details>
    </details>
  );
}

const toggleWidth = "1.333em";
const togglePadding = `calc(${toggleWidth} + 1em)`;

const Summary = styled.summary`
  ${applyTypeScale("24px", "18px")}
  position: relative;
  display: flex;
  align-self: baseline;
  padding-left: ${togglePadding};
  cursor: pointer;

  &::-webkit-details-marker {
    display: none;
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: ${toggleWidth};
    height: ${toggleWidth};
    font-size: 1.25em;
    font-weight: 800;
    line-height: ${toggleWidth};
    color: var(--white);
    content: "+";
    background-color: var(--turquoise55);
    transition: background-color 0.2s;
    place-content: center;
  }

  &:focus {
    outline: none;
  }

  &:hover::before,
  &:focus-visible::before {
    background-color: var(--turquoise85);
  }
`;

const Details = styled.div`
  padding-left: ${togglePadding};
  margin-top: 1.5em;
`;

Accordion.displayName = "Primitives.Accordion";

Accordion.propTypes = {
  summary: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
