"use client";

import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import Error from "@/components/organisms/Error";

const ErrorPage: FunctionComponent<ErrorProps> = ({ error }) => {
  const { t } = useTranslation();
  return <Error title={t("error-title")} message={error.message} />;
};

export default ErrorPage;
