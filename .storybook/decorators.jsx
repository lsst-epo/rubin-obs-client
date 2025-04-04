import React from "react";
import { GlobalStyles } from "@rubin-epo/epo-react-lib/styles";

const withTheme = (StoryFn) => {
  return (
    <>
      <GlobalStyles />
      {<StoryFn />}
    </>
  );
};

// export all decorators that should be globally applied in an array
export default [withTheme];
