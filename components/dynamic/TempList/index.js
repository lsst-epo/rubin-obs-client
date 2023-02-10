import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Container } from "@rubin-epo/epo-react-lib";
import { MixedLink } from "@/components/atomic/";
import { respond } from "@/styles/globalStyles";
import { allData } from "./data";
import { mixedLinkShape } from "@/components/shapes/link";
import IconComposer from "@/components/svg/IconComposer";
import ResponsiveImage from "@/components/atomic/ResponsiveImage";

const Alert = ({ data }) => {
  const { t } = useTranslation();

  return (
    <AlertWrapper>
      <div>
        <h4>{t(`alert.solar-systems-found`)}</h4>
        <Data>{data.systems}</Data>
        <AlertSubData>
          {t(`alert.total-to-date`)}
          <br /> {data.systemsToDate}
        </AlertSubData>
      </div>
      <div>
        <h4>{t(`alert.broker-classifications`)}</h4>
        <Data>{data.class}</Data>
        <AlertSubData>
          {t(`alert.total-to-date`)}
          <br /> {data.classToDate}
        </AlertSubData>
      </div>
    </AlertWrapper>
  );
};

const Telescope = ({ data }) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <State>
        <h4>
          {t(`telescope.state`)}: {t(`telescope.${data.currentState}`)}
        </h4>
        <StateImage>
          <ResponsiveImage
            image={{
              url: "/telescope_state.png",
            }}
            ratio="1:1"
          />
        </StateImage>
      </State>
      <Point>
        <h4>{t(`telescope.point`)}</h4>
        <Data>{data.pointingAt}</Data>
        <PointSubData>{data.pointingAt2}</PointSubData>
      </Point>
      <Temp>
        <h4>{t(`telescope.temp`)}</h4>
        <Data>
          <StyledTempIcon icon="temp" />
          {data.temp}
        </Data>
        <SubData>
          {t(`telescope.temp-data`)}: {data.temp2}
        </SubData>
      </Temp>
      <Image>
        <h4>{t(`telescope.image`)}</h4>
        <Data>
          <StyledIcon icon="time" />
        </Data>
        <SubData>
          {data.image} {t(`telescope.image-data`)}
        </SubData>
      </Image>
      <Weather>
        <h4>{t(`telescope.weather`)}</h4>
        <Data>
          <StyledIcon icon="cloud" />
        </Data>
        <SubData>{t(`telescope.${data.weather}`)}</SubData>
      </Weather>
      <Moon>
        <h4>{t(`telescope.moon`)}</h4>
        <Data>
          <StyledIcon icon="calendar" />
        </Data>
        <SubData>{t(`telescope.${data.moon}`)}</SubData>
      </Moon>
    </Wrapper>
  );
};

const TempList = ({ dynamicComponent, header, mixedLink, panelProps }) => {
  const data = allData[dynamicComponent];

  return header && mixedLink ? (
    <StyledContainer bgColor="black" width="regular" elAttributes={panelProps}>
      <HeaderBlock>
        <Header>{header}</Header>
        {(mixedLink?.element || mixedLink?.url) && (
          <StyledMixedLink {...mixedLink} />
        )}
      </HeaderBlock>
      {dynamicComponent === "telescopeStatus" && <Telescope data={data} />}
      {dynamicComponent === "alertStream" && <Alert data={data} />}
    </StyledContainer>
  ) : (
    <>
      {dynamicComponent === "telescopeStatus" && <Telescope data={data} />}
      {dynamicComponent === "alertStream" && <Alert data={data} />}
    </>
  );
};

const StyledContainer = styled(Container)`
  @media (max-width: 900px) {
    padding-bottom: 40px;
  }
`;

const HeaderBlock = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-gap: 40px;
  padding: 0.5rem 0;
  border-bottom: 6px solid var(--turquoise80);
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-gap: 0;
    margin-bottom: 10px;
  }
`;

const Header = styled.h3`
  color: var(--white);
`;

const StyledMixedLink = styled(MixedLink)`
  color: var(--turquoise80);
  text-decoration: none;
`;

const AlertWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  color: var(--white);
  > * {
    background-color: var(--neutral80);
    display: grid;
    place-items: center;
    padding: 10px;
  }
  ${respond(`
    grid-template-columns: 1fr;
  `)}
`;

const AlertSubData = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-areas:
    "state point temp temp"
    "state image weather moon";
  grid-gap: 20px;
  color: var(--white);
  min-height: 300px;
  margin: 20px 0;
  > * {
    background-color: var(--neutral80);
    display: grid;
    place-items: center;
    padding: 1em;
    grid-gap: 0.25em;
  }
  ${respond(`
  grid-template-areas:
    "state state point point"
    "state state temp temp"
    "weather moon moon image";
    grid-template-columns: 2fr 1fr 1fr 2fr;
  `)}
`;

const State = styled.div`
  grid-area: state;
`;
const Point = styled.div`
  grid-area: point;
`;
const Temp = styled.div`
  grid-area: temp;
`;
const Image = styled.div`
  grid-area: image;
`;
const Weather = styled.div`
  grid-area: weather;
`;
const Moon = styled.div`
  grid-area: moon;
`;

const StateImage = styled.div`
  place-self: start;
  width: 100%;
  padding: 0 1em;
`;

const Data = styled.div`
  display: flex;
  align-items: center;
  color: var(--turquoise50);
  font-size: 28px;
  font-weight: 800;
`;

const SubData = styled.div``;

const PointSubData = styled.div`
  color: var(--turquoise50);
  font-weight: 800;
`;

const StyledTempIcon = styled(IconComposer)`
  width: 28px;
  height: 28px;
`;

const StyledIcon = styled(IconComposer)`
  position: relative;
  top: 4px;
  width: 40px;
  height: 40px;
`;

Alert.propTypes = {
  data: PropTypes.object,
};

Telescope.propTypes = {
  data: PropTypes.object,
};

TempList.propTypes = {
  dynamicComponent: PropTypes.string,
  header: PropTypes.string,
  mixedLink: mixedLinkShape,
  panelProps: PropTypes.shape({
    role: PropTypes.string,
    "aria-hidden": PropTypes.bool,
    "aria-labelledby": PropTypes.string,
    id: PropTypes.string,
  }),
};

export default TempList;
