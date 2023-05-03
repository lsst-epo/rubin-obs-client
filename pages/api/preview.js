import { isCraftPreview } from "@/helpers";
import { getEntryDataByUid } from "@/api/entry";

const preview = async (req, res) => {
  const PREVIEW_SLUG = process.env.NEXT_PREVIEW_SLUG;
  const { query } = req;
  const isPreview = isCraftPreview(query);
  // N.B. previewToken isn't consistently available
  const previewToken = query.token || undefined;
  if (!query.entryUid)
    return res
      .status(401)
      .json({ message: "Not allowed to access this route" });

  if (!isPreview)
    return res.status(401).json({
      message: `Preview Mode must be enabled to view entry "${query.entryUid}"`,
    });

  // Fetch the headless CMS to check if the provided entry exists
  const site = query.site === "ES" ? "es" : "default";
  const entry = await getEntryDataByUid(query.entryUid, site, previewToken);
  if (!entry?.uri)
    return res.status(401).json({
      message: `URI of the entry "${query.entryUid}" could not be fetched`,
    });

  // const { pathname } = new URL(entry.url.replace("/es/es", "/es"));
  const { uri } = entry;
  // N.B. Because previewToken presence is unreliable, we're always redirecting to previewUri so real pages are never inadvertently updated.
  // If a previewToken becomes reliable, inclusion of previewToken in the preview data should be enough (and could use real page uri as redirect)
  const previewUri = `/${PREVIEW_SLUG}`;

  // Enable Preview Mode by setting the cookies
  res.setPreviewData(
    {
      previewToken,
      uriSegments: uri.split("/"),
    },
    {
      maxAge: 120,
      path: previewUri,
    }
  );
  // Redirect to the path from the fetched url
  res.redirect(previewUri);
};

export default preview;
