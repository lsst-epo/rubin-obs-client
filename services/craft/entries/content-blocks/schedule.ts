import { graphql } from "@/gql";

const ScheduleBlockFragment = graphql(`
  fragment scheduleBlock on contentBlocks_schedule_BlockType {
    id
    typeHandle
    date
    description
    scheduleRows: children {
      ... on contentBlocks_scheduleRow_BlockType {
        startTime
        endTime
        description
        bold
      }
    }
  }
`);

export default ScheduleBlockFragment;
