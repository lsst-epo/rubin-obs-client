import { isCraftPreview } from "@/helpers";
import { getPageUrlByUid } from "@/api/pages";

const preview = async (req, res) => {
  const { query } = req;
  const isPreview = isCraftPreview(query);
  const previewToken = query.token || null;

  if (!query.entryUid) {
    return res
      .status(401)
      .json({ message: "Not allowed to access this route" });
  }

  let site = "default";
  if (query.site === "ES") {
    site = "es";
  }

  // Fetch the headless CMS to check if the provided entry exists
  const entry = await getPageUrlByUid(query.entryUid, site, previewToken);
  if (!entry?.url) {
    return res.status(401).json({
      message: `URL of the entry "${query.entryUid}" could not be fetched`,
    });
  }

  // Enable Preview Mode by setting the cookies
  if (previewToken) {
    res.setPreviewData({
      previewToken,
    });
  }

  const parsedUrl = new URL(entry.url.replace("/es/es", "/es"));

  // Redirect to the path from the fetched url
  res.writeHead(307, { Location: parsedUrl.pathname });
  res.end();
};

export default preview;
