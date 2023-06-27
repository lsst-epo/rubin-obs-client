import PropTypes from "prop-types";
import styled from "styled-components";
import { Accordion, Container } from "@rubin-epo/epo-react-lib";

export default function AccordionGroup({ header, accordions }) {
  return (
    <Container>
      <div>
        {header && <h2>{header}</h2>}
        <AccordionList>
          {accordions.map(({ text, header, id }) => (
            <Accordion key={id} summary={header}>
              <div
                dangerouslySetInnerHTML={{ __html: text }}
                className="c-content-rte"
              />
            </Accordion>
          ))}
        </AccordionList>
      </div>
    </Container>
  );
}

const AccordionList = styled.div`
  &:not(:first-child) {
    margin-top: 1em;
  }

  > * + * {
    margin-top: 50px;
  }
`;

AccordionGroup.displayName = "ContentBlock.AccordionGroup";

AccordionGroup.propTypes = {
  header: PropTypes.string,
  accordions: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      text: PropTypes.node.isRequired,
    })
  ),
};
