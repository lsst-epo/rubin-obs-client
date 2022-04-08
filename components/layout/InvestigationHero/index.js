import * as Styled from "./styles";
import { Button } from "@/components/atomic";
import IconComposer from "@/components/svg/IconComposer";

export default function InvestigationHero() {
  return (
    <Styled.Wrapper>
      <Styled.Inner>
        <Styled.Image>
          <img src="/images/coloring_the_universe.png" />
        </Styled.Image>
        <Styled.Text>
          <h1>Coloring the Universe</h1>
        </Styled.Text>
        <Styled.ButtonWrapper>
          <Button styleAs="educator">Start Investigation</Button>
        </Styled.ButtonWrapper>
        <Styled.Duration>
          <IconComposer icon="timer" />
          <Styled.DurationText>
            Investigation total duration
          </Styled.DurationText>
          <Styled.DurationTime>1-2h</Styled.DurationTime>
        </Styled.Duration>
      </Styled.Inner>
    </Styled.Wrapper>
  );
}
