type SearchParams = Record<string, string | Array<string> | undefined>;
type LocaleParams = {
  locale: string;
};

interface LocaleProps {
  params: LocaleParams;
  searchParams?: SearchParams;
}

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
