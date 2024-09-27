import { gql } from "graphql-request";
import { queryAPI } from "@/lib/fetch";
import { getLocaleString, getSiteFromLocale } from "@/lib/utils";

const PREVIEW_SECRET_TOKEN = process.env.CRAFT_SECRET_TOKEN;
const CRAFT_HOMEPAGE_URI = "__home__";

const Query = gql`
  query PagePreviewQuery($site: [String], $uri: [String]) {
    entry(site: $site, uri: $uri) {
      uri
      title
    }
  }
`;

/**
 * @function preview
 * @param {import("next").NextApiRequest} request
 * @param {import("next").NextApiResponse} response
 */
const preview = async (request, response) => {
  const searchParams = new URLSearchParams(request.query);

  const secret = searchParams.get("secret");
  const previewToken = searchParams.get("token");
  const site = getSiteFromLocale(
    (searchParams.get("site") || "en").toLowerCase()
  );
  const isDefaultSite = site === "default";
  const locale = getLocaleString(site);
  const uri = searchParams.get("uri");

  // Check the secret and next parameters
  // This secret should only be known to this route handler and the CMS
  if (secret !== PREVIEW_SECRET_TOKEN) {
    return response.status(401).send({ message: "Invalid token" });
  }

  if (!uri) {
    return response.status(401).send({ message: "URI missing" });
  }

  const res = await queryAPI(Query, undefined, previewToken, { site, uri });

  // If the uri doesn't exist prevent draft mode from being enabled
  if (!res?.entry?.uri) {
    return response.status(401).send({ message: "Invalid uri" });
  }

  // Enable Draft Mode by setting the cookie
  response.setDraftMode({ enable: true });

  if (res.entry.uri === CRAFT_HOMEPAGE_URI) {
    const redirect = `/${locale}`;
    const cookiePath = isDefaultSite ? "/" : redirect;

    response.setPreviewData(
      { previewToken },
      { path: cookiePath, maxAge: 120 }
    );
    response.redirect(redirect);
  } else {
    const redirectUri = `/${res.entry.uri}`;
    const redirect = `/${locale}${redirectUri}`;
    const cookiePath = `${
      site === "default" ? "" : `/${locale}`
    }${redirectUri}`;

    response.setPreviewData(
      { previewToken },
      { path: cookiePath, maxAge: 120 }
    );
    response.redirect(redirect);
  }
};

export default preview;
