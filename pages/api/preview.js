import { isCraftPreview } from "@/helpers";
import { getEntryDataByUid } from "@/api/entry";

const preview = async (req, res) => {
  const { query } = req;
  const isPreview = isCraftPreview(query);
  const previewToken = query.token || undefined;

  if (!query.entryUid)
    return res
      .status(401)
      .json({ message: "Not allowed to access this route" });

  if (!isPreview || !previewToken)
    return res.status(401).json({
      message: `Preview token must be provided to view entry "${query.entryUid}"`,
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
  const previewUri = `/preview-in-craft-cms/${uri}`;
  // Enable Preview Mode by setting the cookies
  res.setPreviewData(
    {
      previewToken,
      uri,
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
