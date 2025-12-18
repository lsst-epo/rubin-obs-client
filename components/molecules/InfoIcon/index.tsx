import { FC } from "react";
import * as Styled from "./styles";
import UniqueIconComposer from "@/components/svg/UniqueIconComposer";

const InfoIcon: FC = () => {
  return (
    <Styled.InfoIcon>
      <UniqueIconComposer icon="info" />
    </Styled.InfoIcon>
  );
};

export default InfoIcon;
