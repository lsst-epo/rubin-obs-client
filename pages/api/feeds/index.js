import {
  supportedTypes,
  formattedTypesList,
  getEntries,
  generateFeed,
  writeFeedsToDisk,
} from "@/api/feeds";

async function handler(req, res) {
  try {
    const entryData = await getEntries(supportedTypes);
    const publicPath = `feeds/`;
    const feed = await generateFeed({
      entries: entryData?.entries,
      publicPath,
    });

    const writePath = `./public/${publicPath}`;
    writeFeedsToDisk({ path: writePath, feed }).then(() => {
      res.status(200).json({
        message: `Index feed for entry types ${formattedTypesList} has been successfully written to ${writePath}.`,
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: `Failed to generate index feed for entry types "${formattedTypesList}".`,
    });
  }
}

export default handler;
