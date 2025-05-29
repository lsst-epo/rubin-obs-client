"server-only";

import { env } from "@/env";
import { useFragment } from "@/gql";
import { SiteInfoFragmentFragmentDoc } from "@/gql/graphql";
import { getGlobalData } from "@/lib/api/globals";
import { getLocale } from "next-intl/server";
import { Organization } from "schema-dts";
import { getLogos } from "./logos";
import getSocials from "./socials";

export async function getOrganizationData() {
  const logos = await getLogos();
  const socials = await getSocials();
  const { siteInfo } = await getGlobalData(await getLocale());
  /* eslint-disable react-hooks/rules-of-hooks */
  const { siteTitle: name, siteImage } = useFragment(
    SiteInfoFragmentFragmentDoc,
    siteInfo
  );

  const sameAs = Object.values(socials || {}).filter(
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
    email: socials?.email ?? undefined,
    url: env.NEXT_PUBLIC_BASE_URL,
    logo: logos?.large.src,
    image,
    sameAs,
  };

  return organization;
}
