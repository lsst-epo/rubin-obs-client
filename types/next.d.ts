type SearchParams = Record<string, string | Array<string> | undefined>;
type LocaleParams = {
  locale: string;
};

type UriSegmentParams = {
  uriSegments: Array<string>;
};

interface LocaleProps {
  params: LocaleParams;
  searchParams?: SearchParams;
}

interface UriSegmentProps {
  params: LocaleParams & UriSegmentParams;
  searchParams: SearchParams;
}

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
