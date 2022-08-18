import PropTypes from "prop-types";
import "regenerator-runtime/runtime";
import styled from "styled-components";
import Container from "@/layout/Container";
import SpaceSurveyors from "@rubin-epo/space-surveyors";
import { useIsMounted } from "@/hooks";

export default function Game({ game }) {
  const isMounted = useIsMounted();

  const games = {
    spaceSurveyors: SpaceSurveyors,
  };

  const Game = games[game];

  if (!Game) {
    return (
      <Container>
        <div>Game not available</div>
      </Container>
    );
  }

  if (!isMounted) return null;

  return (
    <Container>
      <Wrapper>
        <Game />
      </Wrapper>
    </Container>
  );
}

const Wrapper = styled.div`
  position: relative;
  z-index: 0;
  height: calc(90vh - 110px);
`;
Game.displayName = "ContentBlock.Game";

Game.propTypes = {
  game: PropTypes.string,
};
