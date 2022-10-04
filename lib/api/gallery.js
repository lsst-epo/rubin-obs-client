import { gql } from "graphql-request";
import { queryAPI } from "@/lib/fetch";

export async function getGalleryAssetMetadataDefaults(
  site = "default",
  previewToken
) {
  const query = gql`
    {
      metadataDefaults: globalSet(site: "${site}", handle: "galleryItemDefaults") {
        ... on galleryItemDefaults_GlobalSet {
          credit: creditDefault
          metadataVersion: metadataVersionDefault
          publisher: publisherDefault
          publisherId: publisherIdDefault
          usageTerms: usageTermsDefault
        }
      }
    }
  `;
  const data = await queryAPI(query, null, previewToken);
  return data?.metadataDefaults;
}

export async function addGalleryAssets(entryData) {
  if (
    !entryData ||
    entryData.pageType !== "dynamic" ||
    entryData.dynamicComponent !== "galleryItems"
  )
    return null;

  const params = new URLSearchParams({ album_id: "HDSNU", limit: 10 });
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/canto-assets?${params.toString()}`
  );
  try {
    const json = await data.json();
    return Object.assign(entryData, { gallery: json });
  } catch (error) {
    return entryData;
  }
}

function getUri(id, language) {
  switch (language) {
    case "es":
      return `galeria/${id}`;
    default:
      return `gallery/${id}`;
  }
}

function getTitleKey(language) {
  switch (language) {
    case "es":
      return "Title **ES**";
    default:
      return "Title **EN**";
  }
}

function getAltTextKey(language) {
  switch (language) {
    case "es":
      return "Alt Text **ES**";
    default:
      return "Alt Text **EN**";
  }
}

function getCaptionKey(language) {
  switch (language) {
    case "es":
      return "Caption **ES**";
    default:
      return "Caption **EN**";
  }
}
export function shapeGalleryAssetData({
  assetData,
  language = "en-US",
  metadataDefaults = {},
}) {
  const titleKey = getTitleKey(language);
  const altTextKey = getAltTextKey(language);
  const captionKey = getCaptionKey(language);

  const {
    id,
    url: { directUrlPreview },
    scheme,
    width,
    height,
    additional: {
      [titleKey]: title,
      [altTextKey]: altText,
      [captionKey]: caption,
      Credit: credit,
      "Metadata version": metadataVersion,
      Publisher: publisher,
      "Publisher ID": publisherId,
      "Usage Terms": usageTerms,
    },
    metadata,
    smartTags: tags,
  } = assetData;

  return {
    id,
    uri: getUri(id, language),
    scheme,
    title,
    description: caption,
    caption,
    image: {
      url: directUrlPreview,
      width: 800,
      height: parseInt((800 * height) / width),
      altText,
    },
    tags,
    ...(metadata && {
      metadata: {
        credit: credit ?? metadataDefaults.credit,
        metadataVersion: metadataVersion ?? metadataDefaults.version,
        metadataDate: metadata["Date modified"],
        publisher: publisher ?? metadataDefaults.publisher,
        publisherId: publisherId ?? metadataDefaults.publisherId,
        dateCreated: metadata["Date Created"],
        usageTerms: usageTerms ?? metadataDefaults.usageTerms,
      },
    }),
  };
}
