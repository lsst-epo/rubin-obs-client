import { queryAPI } from "@/lib/fetch";
import { gql } from "graphql-request";

async function getData() {
  const query = gql`
    {
      globalSet {
        ... on cantoGalleryItems_GlobalSet {
          cantoAsset {
            url {
              LowJPG
              HighJPG
              directUrlOriginal
            }
          }
        }
      }
    }
  `;
  const data = await queryAPI(query);
  return data;
}

async function getAllGalleryItems() {
  const ENV = process.env.CLOUD_ENV;
  const data = await getData(ENV);
  return data.entries
    .filter(({ uri }) => uri != null)
    .map(({ uri, sectionHandle }) => ({
      params: { uriSegments: uri.split("/"), uri, sectionHandle },
    }));
}

export async function getStaticPaths() {
  return {
    paths: await getAllGalleryItems(),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params: { uriSegments } }) {
  const res = await fetch("https://api.github.com/repos/vercel/next.js");
  const repo = await res.json();
  return { props: { repo } };
}

export default function Page({ repo }) {
  <div>Test Page</div>;
}
