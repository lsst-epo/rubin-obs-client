import { gql } from "@urql/core";
import queryAPI from "@/lib/api/client/query";
import {
  slideshowFragment,
  slideshowSlidesFragment,
} from "@/lib/api/fragments/slideshow";
import { getSiteFromLocale } from "@/lib/helpers/site";

export async function getSlideshowDataByUri(uri: string, locale: string) {
  const site = getSiteFromLocale(locale);
  const query = gql`
    ${slideshowFragment}
    ${slideshowSlidesFragment}
    query getSlideshow($site: [String], $uri: [String]) {
      entry(section: "slideshows", site: $site, uri: $uri) {
        ...slideshowFragment
        ...SlideshowSlides
      }
    }
  `;

  const { data } = await queryAPI({
    query,
    variables: { uri, site },
  });

  return data;
}
