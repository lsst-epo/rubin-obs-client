type SearchParams = Record<string, string | Array<string> | undefined>;

/** Layout components cannot access search params, so route segment
 *  props should be extended for Page components with this helper.
 */
type WithSearchParams<T = unknown> = T & {
  /** An object containing the search parameters of the current URL
   * @link https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional
   */
  searchParams?: SearchParams;
};

type LocaleParams = {
  locale: string;
};

type UriSegmentParams = {
  uriSegments: Array<string>;
};

type GalleryParams = {
  gallery: string;
};

type GalleryAssetParams = {
  asset: string;
};

interface LocaleProps {
  params: LocaleParams;
}

interface UriSegmentProps {
  params: LocaleParams & UriSegmentParams;
}

interface GalleryProps {
  params: LocaleParams & GalleryParams;
}

interface GalleryAssetProps {
  params: LocaleParams & GalleryParams & GalleryAssetParams;
}

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
