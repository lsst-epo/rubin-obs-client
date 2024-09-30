"use client";
import { FunctionComponent } from "react";

import Error from "@/components/organisms/Error";
const GlobalError: FunctionComponent<ErrorProps> = ({ error }) => {
  return (
    <html lang="en">
      <head></head>
      <body>
        <Error title={"Error"} message={error.message} />
      </body>
    </html>
  );
};

export default GlobalError;
