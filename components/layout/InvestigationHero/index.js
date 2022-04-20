import PropTypes from "prop-types";
import * as Styled from "./styles";
import { Button } from "@/components/atomic";
import IconComposer from "@/components/svg/IconComposer";
import T from "@/page/Translate";

export default function InvestigationHero({ investigation }) {
  if (!investigation) return null;

  return (
    <Styled.Wrapper>
      <Styled.Inner>
        <Styled.Image>
          <img src="/images/coloring_the_universe.png" />
        </Styled.Image>
        <Styled.Text>
          <h1>{investigation.title}</h1>
        </Styled.Text>
        <Styled.ButtonWrapper>
          <Button styleAs="educator" as="a" href={investigation.externalUrl}>
            <T translate="investigation.start" />
          </Button>
        </Styled.ButtonWrapper>
        <Styled.Duration>
          <IconComposer icon="timer" />
          <Styled.DurationText>
            <T translate="investigation.total_duration" />
          </Styled.DurationText>
          <Styled.DurationTime>{investigation.duration}</Styled.DurationTime>
        </Styled.Duration>
      </Styled.Inner>
    </Styled.Wrapper>
  );
}

InvestigationHero.propTypes = {
  investigation: PropTypes.shape({
    title: PropTypes.string,
    duration: PropTypes.duration,
    externalUrl: PropTypes.string,
    isActive: PropTypes.bool,
    landingPage: PropTypes.arrayOf(
      PropTypes.shape({
        uri: PropTypes.string,
        title: PropTypes.string,
      })
    ),
  }),
};
