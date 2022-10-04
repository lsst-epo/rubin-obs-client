import { queryCantoAPI } from "@/lib/fetch";

async function fetchCantoAsset({ id, scheme = "image" }) {
  const accessToken = process.env.CANTO_ACCESS_TOKEN;
  const options = {
    method: "GET",
    headers: new Headers({
      Authorization: `Token ${accessToken}`,
    }),
  };
  return await queryCantoAPI({
    url: `https://rubin.canto.com/api/v1/${scheme}/${id}`,
    options,
  });
}

async function handler(req, res) {
  if (!req.query.id)
    return res.status(400).json({
      error: `The parameter "id" is required to make this request.`,
    });
  if (!req.query.scheme)
    return res.status(400).json({
      error: `The parameter "scheme" is required to make this request.`,
    });

  try {
    const data = await fetchCantoAsset(req.query);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error.message,
    });
  }
}

export default handler;
