import * as Styled from "./styles";
import { Button } from "@/components/atomic";
import IconComposer from "@/components/svg/IconComposer";
import T from "@/page/Translate";

const FAKE_DATA = {
  title: "Coloring the Universe",
  duration: "1-2h",
};

export default function InvestigationHero() {
  return (
    <Styled.Wrapper>
      <Styled.Inner>
        <Styled.Image>
          <img src="/images/coloring_the_universe.png" />
        </Styled.Image>
        <Styled.Text>
          <h1>{FAKE_DATA.title}</h1>
        </Styled.Text>
        <Styled.ButtonWrapper>
          <Button styleAs="educator">
            <T translate="investigation.start" />
          </Button>
        </Styled.ButtonWrapper>
        <Styled.Duration>
          <IconComposer icon="timer" />
          <Styled.DurationText>
            <T translate="investigation.total_duration" />
          </Styled.DurationText>
          <Styled.DurationTime>{FAKE_DATA.duration}</Styled.DurationTime>
        </Styled.Duration>
      </Styled.Inner>
    </Styled.Wrapper>
  );
}
