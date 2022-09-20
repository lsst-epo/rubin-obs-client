async function handler(req, res) {
  if (req.query.secret !== process.env.CRAFT_REVALIDATE_SECRET_TOKEN)
    return res.status(401).json({ error: "Invalid token" });

  if (!req.query.uri)
    return res.status(500).json({ error: `The parameter "uri" is required.` });

  try {
    await res.revalidate(`/${req.query.uri}`);
    return res.json({ revalidated: true });
  } catch (error) {
    console.error(error);
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}

export default handler;
