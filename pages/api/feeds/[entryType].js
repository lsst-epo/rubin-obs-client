import {
  supportedTypes,
  getEntries,
  generateFeed,
  writeFeedsToDisk,
} from "@/api/feeds";

async function handler(req, res) {
  const { entryType } = req.query;

  if (!supportedTypes.includes(entryType))
    return res.status(501).json({
      error: `Feed generation for entry type "${entryType}" is not currently supported.`,
    });

  try {
    const entryData = await getEntries([entryType]);
    const publicPath = `feeds/${entryType}/`;
    const feed = await generateFeed({
      entries: entryData?.entries,
      publicPath,
      entryType,
    });

    const writePath = `./public/${publicPath}`;
    writeFeedsToDisk({ path: writePath, feed }).then(() => {
      res.status(200).json({
        message: `Feeds for entry type "${entryType}" have been successfully written to ${writePath}.`,
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: `Failed to generate feeds for entry type "${entryType}".`,
    });
  }
}

export default handler;
