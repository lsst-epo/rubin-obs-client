"server-only";

import { env } from "@/env";
import { useFragment } from "@/gql";
import { SiteInfoFragmentFragmentDoc } from "@/gql/graphql";
import { getGlobalData } from "@/lib/api/globals";
import { getLocale } from "next-intl/server";
import { Organization } from "schema-dts";
import { getLogos } from "./logos";

export async function getOrganizationData() {
  const logos = await getLogos();
  const { siteInfo } = await getGlobalData(await getLocale());
  /* eslint-disable react-hooks/rules-of-hooks */
  const {
    siteTitle: name,
    siteImage,
    email,
    facebook,
    instagram,
    linkedIn,
    twitter,
    youTube,
  } = useFragment(SiteInfoFragmentFragmentDoc, siteInfo);

  const sameAs = [facebook, instagram, linkedIn, twitter, youTube].filter(
    (item): item is string => !!item
  );

  const image = siteImage
    .map((image) => {
      if (image && image.__typename === "generalImages_Asset" && image.url) {
        return image.url;
      }

      return undefined;
    })
    .filter((item): item is string => !!item);

  const organization: Organization = {
    "@type": "Organization",
    name: name ?? undefined,
    email: email ?? undefined,
    url: env.NEXT_PUBLIC_BASE_URL,
    logo: logos?.large.src,
    image,
    sameAs,
  };

  return organization;
}
