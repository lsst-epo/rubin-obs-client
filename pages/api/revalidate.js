/* eslint-disable no-console */
import { isCraftPreview } from "@/helpers";

const REVALIDATE_SECRET_TOKEN = process.env.CRAFT_REVALIDATE_SECRET_TOKEN;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

console.info("test test");


/**
 * @function preview
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
async function handler(req, res) {
  const { query } = req;
  const isPreview = isCraftPreview(query);

  if (isPreview) {
    return res.status(401).json({
      message:
        "Revalidate failed because request included Craft Preview header",
    });
  }

  if (query.secret !== REVALIDATE_SECRET_TOKEN) {
    console.warn("Invalid token");
    return res.status(401).json({ error: "Invalid token" });
  }

  if (!query.uri) {
    console.warn(`The parameter "uri" is required.`);
    return res.status(500).json({ error: `The parameter "uri" is required.` });
  }

  try {
    const searchParams = new URLSearchParams(query);

    await fetch(`${BASE_URL}/api/app-revalidate?${searchParams.toString()}`);
    await res.revalidate(`/${query.uri}`);
    return res.status(200).json({ revalidated: true });
  } catch (error) {
    console.error(error);
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}

export default handler;
