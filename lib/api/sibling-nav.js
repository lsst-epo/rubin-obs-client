import { gql } from "graphql-request";
import useSWR from "swr";
import { queryAPI } from "@/lib/fetch";

export function useSiblingNav({ uri, site, level }) {
  const { data, error } = useSWR(
    gql`
      {
        entry (uri: "${uri}", site: "${site}") {
            parent {
                id
                uri
                title
                level
            }
            prev(section: "pages", site: "${site}", level: ${level}) {
                id
                uri
                title
                level
            }
            next(section: "pages", site: "${site}", level: ${level}) {
                id
                uri
                title
                level
            }
        }
    }
      `,
    queryAPI
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
