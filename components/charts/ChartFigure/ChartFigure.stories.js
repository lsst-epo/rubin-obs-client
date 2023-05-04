import ChartFigure from ".";
import ChartBase from "../ChartBase";
import XAxis from "../XAxis";
import YAxis from "../YAxis";
import BarData from "../BarData";
import LineData from "../LineData";
import ChartLegend from "../Legend";
import { getLinearScale } from "@/lib/utils";

const meta = {
  component: ChartFigure,
  argTypes: {},
};
export default meta;

const PrimaryTemplate = ({ ...args }) => {
  const width = 900;
  const height = 300;
  const padding = 40;
  const xDomain = [0, 24];
  const tempDomain = [0, 50];
  const xScale = getLinearScale(xDomain, [padding, width - padding]);
  const tempScale = getLinearScale(tempDomain, [height - padding, 0]);
  const legends = [
    { title: "Temperature", type: "line", id: "legendTemperature" },
    { title: "Dew Point", type: "bar", id: "legendDewPoint" },
  ];

  const dewPointData = [
    6, 6, 5, 5, 4, 4, 3, 2.5, 2, 8, 11, 15, 19, 22, 24, 23, 19, 14, 12, 9, 8, 7,
    6.5, 6,
  ];

  const tempData = [
    25, 23, 20, 18, 17, 15, 13, 10, 8, 9, 11, 15, 18, 28, 34, 32, 27, 23, 21,
    19, 15, 12, 14, 22,
  ];

  return (
    <ChartFigure {...args} legend={<ChartLegend legends={legends} />}>
      <ChartBase {...{ width, height }}>
        <XAxis
          {...{
            xDomain,
            xScale,
            y: height - padding,
            ticks: 24,
            labelFormatter: (value) => {
              if (value === 0 || value === 12 || value === 23) {
                const date = new Date();
                date.setHours(value);
                date.setMinutes(0);

                return date.toLocaleString("en-US", {
                  timeStyle: "short",
                  hourCycle: "h23",
                });
              } else {
                return;
              }
            },
            padding,
          }}
        />
        <YAxis
          {...{
            xDomain,
            yDomain: tempDomain,
            xScale,
            yScale: tempScale,
            ticks: 5,
            padding,
            labelFormatter: (value) =>
              Intl.NumberFormat("en-US", {
                style: "unit",
                unit: "celsius",
              }).format(value),
          }}
        />
        <LineData
          {...{
            xDomain,
            yDomain: tempDomain,
            xScale,
            yScale: tempScale,
            data: tempData,
            ticks: 24,
            padding,
            labelledById: "legendTemperature",
          }}
        />
        <BarData
          {...{
            xDomain,
            yDomain: tempDomain,
            xScale,
            yScale: tempScale,
            data: dewPointData,
            ticks: 24,
            padding,
            labelledById: "legendDewPoint",
            tooltipFormatter: (value) =>
              Intl.NumberFormat("en-US", {
                style: "unit",
                unit: "celsius",
              }).format(value),
          }}
        />
      </ChartBase>
    </ChartFigure>
  );
};

const OverflowTemplate = ({ ...args }) => {
  const width = 1800;
  const height = 300;
  const padding = 40;
  const xDomain = [0, 24];
  const humidityDomain = [0, 50];
  const xScale = getLinearScale(xDomain, [padding, width - padding]);
  const humidityScale = getLinearScale(humidityDomain, [height - padding, 0]);
  const legends = [{ title: "Humidity", type: "bar", id: "legendHumidity" }];

  const humidityData = [38, 35, 35, 34, 33, 32, 30, 30, 28, 28, 27, 26, 24, 29];

  const percentageFormatter = (value) =>
    Intl.NumberFormat("en-US", {
      style: "percent",
    }).format(value / 100);

  return (
    <ChartFigure {...args} legend={<ChartLegend legends={legends} />}>
      <ChartBase {...{ width, height }}>
        <XAxis
          {...{
            xDomain,
            xScale,
            y: height - padding,
            ticks: 24,
            labelFormatter: (value) => {
              const now = new Date();
              const nowOffset = 13;
              console.log(now.getHours());
              const date = new Date();
              date.setHours(now.getHours() - nowOffset + value);
              date.setMinutes(0);

              return date.getHours() === now.getHours()
                ? "NOW"
                : date.toLocaleString("en-US", {
                    timeStyle: "short",
                    hourCycle: "h23",
                  });
            },
            padding,
          }}
        />
        <YAxis
          {...{
            xDomain,
            yDomain: humidityDomain,
            xScale,
            yScale: humidityScale,
            ticks: 5,
            padding,
            labelFormatter: percentageFormatter,
          }}
        />
        <BarData
          {...{
            xDomain,
            yDomain: humidityDomain,
            xScale,
            yScale: humidityScale,
            data: humidityData,
            ticks: 24,
            padding,
            labelledById: "Hourly humidity report - Humidity percentage",
            tooltipFormatter: percentageFormatter,
          }}
        />
      </ChartBase>
    </ChartFigure>
  );
};

export const Primary = PrimaryTemplate.bind({});

Primary.args = {
  caption: "Hourly Temperature & Dew Point report - Celsius degrees",
};

export const Overflowing = OverflowTemplate.bind({});

Overflowing.args = {
  caption: "Hourly humidity report - Humidity percentage",
};
