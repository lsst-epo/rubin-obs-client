import { FunctionComponent } from "react";
import Container from "@rubin-epo/epo-react-lib/Container";

const Error: FunctionComponent<{ title: string; message: string }> = ({
  title,
  message,
}) => {
  return (
    <Container>
      <h1>{title}</h1>
      <div
        className="c-content-rte"
        dangerouslySetInnerHTML={{ __html: message }}
      />
    </Container>
  );
};

Error.displayName = "Organism.Error";

export default Error;
