import PropTypes from "prop-types";
import { Container } from "@rubin-epo/epo-react-lib";
import { imageShaper } from "@/lib/utils";
import * as Styled from "./styles";

export default function PeopleBlock({ people, peopleLayout }) {
  const isGrid = peopleLayout === "grid";
  const PeopleComponent = isGrid ? Styled.PeopleGrid : Styled.PeopleList;
  const PersonComponent = isGrid
    ? Styled.PeopleGridItem
    : Styled.PeopleListItem;

  return (
    <Container paddingSize="medium">
      <PeopleComponent>
        {people.length > 0 &&
          [...people].map((person) => {
            const { id, name, personAffiliation, cantoAssetSingle } = person;
            const personImage = imageShaper("EN", cantoAssetSingle?.[0]);

            return (
              <PersonComponent key={id}>
                {isGrid && personImage && (
                  <Styled.PersonImage
                    role="presentation"
                    ratio={"1:1"}
                    image={personImage}
                  />
                )}
                {!isGrid && <Styled.Name>{name}</Styled.Name>}
                {personAffiliation && (
                  <Styled.Affiliation>{personAffiliation}</Styled.Affiliation>
                )}
                {isGrid && <Styled.Name>{name}</Styled.Name>}
              </PersonComponent>
            );
          })}
      </PeopleComponent>
    </Container>
  );
}

PeopleBlock.displayName = "ContentBlock.PeopleBlock";

PeopleBlock.propTypes = {
  peopleLayout: PropTypes.string,
  people: PropTypes.array,
};
