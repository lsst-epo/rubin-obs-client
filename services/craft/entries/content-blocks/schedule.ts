import { graphql } from "@/gql";

const ScheduleBlockFragment = graphql(`
  fragment simpleTableBlock on contentBlocks_NeoField {
    ... on contentBlocks_simpleTable_BlockType {
      id
      typeHandle
      sites
      simpleTable {
        ... on simpleTable_tableRow_BlockType {
          id
          rowTitle
          rowContent
          rowColor
        }
      }
    }
  }
`);

export default ScheduleBlockFragment;
