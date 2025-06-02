"use client";
import { FC } from "react";
import Container from "@rubin-epo/epo-react-lib/Container";
import { useSearchParams } from "next/navigation";

interface SearchHeaderProps {
  title: string;
  locale: string;
}

const SearchHeader: FC<SearchHeaderProps> = ({ title, locale }) => {
  const params = useSearchParams();
  const search = params?.get("search");

  const searchString = Array.isArray(search) ? search[0] : search;
  const keyphrase = searchString
    ?.replace("+", " ")
    .replace(/(^|\s)\S/g, (t) => t.toLocaleUpperCase(locale));

  return (
    <Container className="c-page-header">
      <h1>
        {title}
        {keyphrase && <span>&nbsp;&quot;{keyphrase}&quot;</span>}
      </h1>
    </Container>
  );
};

export default SearchHeader;
