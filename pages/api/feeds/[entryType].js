import { generateFeed, getStaffEntryData, writeFeedsToDisk } from "@/api/feeds";

const SUPPORTED_TYPES = ["staff"];

function getFetchMethodForType(type) {
  switch (type) {
    case "staff":
      return getStaffEntryData;
    default:
      throw new Error(`No fetch method exists for entry type "${type}"`);
  }
}

async function handler(req, res) {
  const { entryType } = req.query;

  if (!SUPPORTED_TYPES.includes(entryType))
    return res.status(501).json({
      error: `Feed generation for entry type "${entryType}" is not currently supported.`,
    });

  try {
    const fetchMethod = getFetchMethodForType(entryType);
    const entryData = await fetchMethod();
    const feed = await generateFeed({ entries: entryData?.entries });

    const writePath = `./public/feeds/${entryType}/`;
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
