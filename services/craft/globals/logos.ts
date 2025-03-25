"server-only";
import { getImageProps } from "next/image";
import { graphql } from "@/gql/gql";
import queryAPI from "@/lib/api/client/query";
import { getSiteFromLocale } from "@/lib/helpers/site";
import tags from "@/lib/api/client/tags";
import { getLocale } from "@/lib/i18n/server";
import { z } from "zod";

const logoSchema = z.object({
  url: z
    .object({ directUrlOriginal: z.string().url() })
    .transform((v) => v.directUrlOriginal),
  width: z.coerce.number(),
  height: z.coerce.number(),
});

const siteInfoSchema = z.object({
  logoLarge: z.array(logoSchema).transform((v) => v[0]),
  logoSmall: z
    .array(logoSchema)
    .transform((v) => v[0])
    .nullable(),
});

export async function getLogos() {
  const locale = getLocale();
  const site = getSiteFromLocale(locale);

  const query = graphql(`
    query getLogos($set: [String], $site: [String]) {
      siteInfo: globalSet(handle: $set, site: $site) {
        ... on siteInfo_GlobalSet {
          __typename
          logoLarge {
            url {
              directUrlOriginal
            }
            width
            height
          }
          logoSmall {
            url {
              directUrlOriginal
            }
            width
            height
          }
        }
      }
    }
  `);

  const { data } = await queryAPI({
    query,
    variables: { set: "siteInfo", site },
    fetchOptions: {
      next: { tags: [tags.globals], revalidate: 60 * 60 },
    },
  });

  if (
    !data ||
    !data.siteInfo ||
    data.siteInfo.__typename !== "siteInfo_GlobalSet"
  ) {
    return undefined;
  }

  const { data: parsed } = siteInfoSchema.safeParse(data.siteInfo);

  if (!parsed) return undefined;

  const { logoLarge, logoSmall } = parsed;

  const { props: large } = getImageProps({
    src: logoLarge.url,
    width: logoLarge.width,
    height: logoLarge.height,
    priority: true,
    sizes: "33vw",
    quality: 90,
    alt: "",
  });

  if (logoSmall) {
    const { props: small } = getImageProps({
      src: logoLarge.url,
      width: logoLarge.width,
      height: logoLarge.height,
      priority: true,
      sizes: "100vw",
      quality: 90,
      alt: "",
    });

    return {
      large,
      small,
    };
  }

  return {
    large,
  };
}
