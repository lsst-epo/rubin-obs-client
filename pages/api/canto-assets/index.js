import { queryCantoAPI } from "@/lib/fetch";

// async function fetchAccessToken() {
//   const options = {
//     method: "POST",
//   };
//   const params = {
//     app_id: APP_ID,
//     app_secret: APP_SECRET,
//     grant_type: "refresh_token",
//     code: REFRESH_TOKEN,
//   };
//   return await doFetch({
//     url: "https://oauth.canto.com/oauth/api/oauth2/token",
//     params,
//     options,
//   });
// }

// https://api.canto.com/#3e9800e9-3c6b-436d-82c6-52c8b2770672
async function fetchCantoAssets({ albumId, ...params }) {
  const accessToken = process.env.CANTO_ACCESS_TOKEN;
  const options = {
    method: "GET",
    headers: new Headers({
      Authorization: `Token ${accessToken}`,
    }),
  };
  return await queryCantoAPI({
    url: `https://rubin.canto.com/api/v1/album/${albumId}`,
    params,
    options,
  });
}

async function handler(req, res) {
  const { album_id: albumId, ...params } = req.query;
  if (!albumId)
    return res.status(400).json({
      error: `The parameter "album_id" is required to make this request.`,
    });

  try {
    // const tokenData = await fetchAccessToken();
    // const accessToken = tokenData.accessToken;
    const data = await fetchCantoAssets({
      albumId,
      ...params,
    });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error.message,
    });
  }
}

export default handler;

/**
 * TODO
 * [ ] deal with search/filter UI (remove?)
 * [ ] add support for videos. any examples to work with? other schema too?
 *
 * Metadata to resolve:
 * [ ] location (no straighforward field in API response)
 * [ ] metadataDate (metadata["Date modified"]? or Craft default)
 * [ ] publisher (additional["Publisher"]?)
 * [ ] variants (nothing similar in API response)
 */
