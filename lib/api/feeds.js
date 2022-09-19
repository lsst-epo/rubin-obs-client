import { mkdir, writeFile } from "node:fs/promises";
import { Feed } from "feed";
import { gql } from "graphql-request";
import { queryAPI } from "@/lib/fetch";
import { getImageFields } from "@/lib/api/fragments/image";
import { staffProfileFragmentRSS } from "@/lib/api/fragments/staff-profile";
import { newsPostFragmentRSS } from "@/lib/api/fragments/news-post";

function handleQueryError(data) {
  const error = data.errors?.[0];
  throw new Error(error, { cause: error?.debugMessage });
}

export const supportedTypes = ["staffProfiles", "news"];

export async function getRSSGlobalData() {
  const query = gql`
    {
      globalSet(site: "default", handle: "siteInfo") {
        ... on siteInfo_GlobalSet {
          language
          siteTitle
          siteDescription
          siteImage {
            ... on generalImages_Asset {
              ${getImageFields("crop", 800, 600)}
            }
          }
          email
        }
      }
    }
  `;

  const data = await queryAPI(query);
  if (data.errors) {
    handleQueryError(data);
  } else {
    return data;
  }
}

function shapeStaffEntry(entry) {
  const { title, position, location } = entry;
  let formattedTitle = title;
  if (position) formattedTitle += ` — ${position}`;
  if (location) formattedTitle += ` — ${location}`;
  return {
    ...entry,
    title: formattedTitle,
  };
}

function shapeEntry(entry) {
  switch (entry.sectionHandle) {
    case "staffProfiles":
      return shapeStaffEntry(entry);
    default:
      return entry;
  }
}

export async function getEntries(entryTypes = []) {
  const section = `[${entryTypes.map((t) => `"${t}"`)}]`;
  const query = gql`
    ${newsPostFragmentRSS}
    ${staffProfileFragmentRSS}
    {
      entries(site: "default", section: ${section}) {
        ...newsPostFragmentRSS
        ...staffProfileFragmentRSS
      }
    }
  `;
  const data = await queryAPI(query);
  if (data.errors) {
    handleQueryError(data);
  } else {
    return { entries: data.entries.map((entry) => shapeEntry(entry)) };
  }
}

export async function generateFeed({ entries, publicPath }) {
  const siteURL = process.env.NEXT_PUBLIC_BASE_URL;
  const siteInfo = await getRSSGlobalData();

  const { siteTitle, siteDescription, language, siteImage, email } =
    siteInfo.globalSet;

  const feed = new Feed({
    title: siteTitle,
    description: siteDescription,
    id: siteURL,
    link: siteURL,
    language,
    image: siteImage?.[0]?.url,
    favicon: `${siteURL}/favicon-32x32.png`,
    feedLinks: {
      rss2: `${siteURL}/${publicPath}feed.xml`,
      json: `${siteURL}/${publicPath}feed.json`,
      atom: `${siteURL}/${publicPath}atom.xml`,
    },
    author: {
      name: siteTitle,
      email,
      link: siteURL,
    },
  });

  if (Array.isArray(entries)) {
    entries.forEach((entry) =>
      feed.addItem({
        title: entry.title,
        id: entry.url,
        link: entry.url,
        description: entry.description,
        date: new Date(entry.date),
        image: entry.image?.[0]?.url,
      })
    );
  }

  return feed;
}

export async function writeFeedsToDisk({ path, feed }) {
  mkdir(path, {
    recursive: true,
  })
    .then(() => {
      const rss = writeFile(`${path}feed.xml`, feed.rss2());
      const atom = writeFile(`${path}atom.xml`, feed.atom1());
      const json = writeFile(`${path}feed.json`, feed.json1());
      return Promise.all([rss, atom, json]);
    })
    .catch((error) => new Error(error));
}
