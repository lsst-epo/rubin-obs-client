import fs from "fs";
import { Feed } from "feed";
import { gql } from "graphql-request";
import { queryAPI } from "@/lib/fetch";
import { getImageFields } from "@/lib/api/fragments/image";

async function getStaffEntryData() {
  const query = gql`
    {
      entries(site: "default", section: "staffProfiles") {
        url
        title
        date: dateUpdated
        ...on staffProfiles_staffProfiles_Entry {
          description: staffBio
          content: staffBio
          image: staffPortrait {
            ...on staffProfiles_Asset {
              ${getImageFields("crop", 800, 600)}
            }
          }
        }
      }
    }
  `;

  return await queryAPI(query);
}

export default async function generateFeed({ siteInfo }) {
  // const siteURL = process.env.NEXT_PUBLIC_BASE_URL;
  const siteURL = "https://dev.rubinobs.com/";
  const postData = await getStaffEntryData();
  const { siteTitle, siteDescription, language, siteImage, email } = siteInfo;

  const feed = new Feed({
    title: siteTitle,
    description: siteDescription,
    id: siteURL,
    link: siteURL,
    language,
    image: siteImage?.[0]?.url,
    favicon: `${siteURL}/favicon-32x32.png`,
    feedLinks: {
      rss2: `${siteURL}/feed/feed.xml`,
      json: `${siteURL}/feed/feed.json`,
      atom: `${siteURL}/feed/atom.xml`,
    },
    author: {
      name: siteTitle,
      email,
      link: siteURL,
    },
  });

  if (Array.isArray(postData.entries) && !!postData.entries.length) {
    postData.entries.forEach((entry) => {
      const { url, title, date, description, content, image } = entry;
      feed.addItem({
        title,
        id: url,
        link: url,
        description,
        content,
        author: [
          {
            name: siteTitle,
            email,
            link: siteURL,
          },
        ],
        date: new Date(date),
        image: image?.[0]?.url,
      });
    });
  }

  fs.mkdirSync("./public/feed", { recursive: true });
  fs.writeFileSync("./public/feed/feed.xml", feed.rss2());
  fs.writeFileSync("./public/feed/atom.xml", feed.atom1());
  fs.writeFileSync("./public/feed/feed.json", feed.json1());
}
