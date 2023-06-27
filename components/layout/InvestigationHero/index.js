import PropTypes from "prop-types";
import * as Styled from "./styles";
import { Button, Image, IconComposer } from "@rubin-epo/epo-react-lib";
import T from "@/page/Translate";
import { useDamAssetAsImage } from "@/lib/utils";

export default function InvestigationHero({ investigation }) {
  const { damAsset, title, externalUrl, duration, status } =
    investigation || {};
  const image = useDamAssetAsImage(damAsset?.[0]);

  if (!investigation) return null;

  return (
    <Styled.Wrapper>
      <Styled.Inner>
        {image && (
          <Styled.Image>
            <Image image={image} />
          </Styled.Image>
        )}
        <Styled.Text>
          <h1>{title}</h1>
        </Styled.Text>
        <Styled.ButtonWrapper>
          <Button styleAs="educator" as="a" href={externalUrl}>
            <T translate="investigation.start" />
          </Button>
        </Styled.ButtonWrapper>
        <Styled.Duration>
          <IconComposer icon="timer" />
          <Styled.DurationText>
            <T translate="investigation.total_duration" />
          </Styled.DurationText>
          <Styled.DurationTime>{duration}</Styled.DurationTime>
        </Styled.Duration>
        {status === "earlyAccess" && <Styled.EarlyAccessFlag />}
      </Styled.Inner>
    </Styled.Wrapper>
  );
}

InvestigationHero.propTypes = {
  investigation: PropTypes.shape({
    title: PropTypes.string,
    duration: PropTypes.string,
    externalUrl: PropTypes.string,
    status: PropTypes.string,
    landingPage: PropTypes.arrayOf(
      PropTypes.shape({
        uri: PropTypes.string,
        title: PropTypes.string,
      })
    ),
  }),
};
