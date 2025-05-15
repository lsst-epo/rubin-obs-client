import { type Meta, type StoryObj } from "@storybook/react";

import FilmReel from ".";
import Share from "@/components/molecules/Share";

const meta: Meta<typeof FilmReel> = {
  component: FilmReel,
};
export default meta;

export const Primary: StoryObj<typeof FilmReel> = {
  args: {
    items: [
      "Today’s image is just the first frame in a movie →",
      "(This film will go on and on for ten years!)",
      "You might as well grab 10-years worth of popcorn",
      <>
        Share it! Do you know someone who might enjoy knowing this? <Share />
      </>,
      <>
        …and come back to{" "}
        <a href="https://rubinobservatory.org">rubinbservatory.org</a>{" "}
        regularly! We’ll be making this movie for everybody to enjoy!
      </>,
    ],
  },
};
