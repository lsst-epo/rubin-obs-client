import ChartFigure from ".";
import ChartBase from "../ChartBase";
import XAxis from "../XAxis";
import YAxis from "../YAxis";
import BarData from "../BarData";
import { getLinearScale } from "@/lib/utils";
import LineData from "../LineData";

const meta = {
  component: ChartFigure,
  argTypes: {},
};
export default meta;

const Template = ({ ...args }) => {
  const width = 900;
  const height = 300;
  const padding = 40;
  const xDomain = [0, 24];
  const tempDomain = [0, 50];
  const xScale = getLinearScale(xDomain, [padding, width - padding]);
  const tempScale = getLinearScale(tempDomain, [height - padding, 0]);

  const dewPointData = [
    6, 6, 5, 5, 4, 4, 3, 2.5, 2, 8, 11, 15, 19, 22, 24, 23, 19, 14, 12, 9, 8, 7,
    6.5, 6,
  ];

  const tempData = [
    25, 23, 20, 18, 17, 15, 13, 10, 8, 9, 11, 15, 18, 28, 34, 32, 27, 23, 21,
    19, 15, 12, 14, 22,
  ];

  return (
    <ChartFigure {...args}>
      <ChartBase {...{ width, height }}>
        <XAxis
          {...{
            xDomain,
            yDomain: tempDomain,
            xScale,
            yScale: tempScale,
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

export const Primary = Template.bind({});

Primary.args = {
  caption: "Hourly Temperature & Dew Point report - Celsius degrees",
};
