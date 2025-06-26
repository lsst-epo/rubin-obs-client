import { print } from "graphql";
import { PagePreviewFragmentDoc } from "@/gql/graphql";
import { gql } from "@urql/core";

export const pageFragment = print(PagePreviewFragmentDoc);

export const redirectFragment = gql`
  fragment redirectFragment on pages_redirectPage_Entry {
    linkTo {
      url
    }
  }
`;
