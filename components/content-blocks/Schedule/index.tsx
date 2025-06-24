import { FC } from "react";
import { FragmentType, useFragment } from "@/gql";
import { ScheduleBlockFragmentDoc } from "@/gql/graphql";
import { makeDateString } from "@/helpers/dates";
import { Container } from "@rubin-epo/epo-react-lib";
import styled from "styled-components";

interface ScheduleProps extends FragmentType<typeof ScheduleBlockFragmentDoc> {
  locale: string;
}

const ScheduleBlock: FC<ScheduleProps> = ({ locale, ...props }) => {
  const { date, description, scheduleRows } = useFragment(
    ScheduleBlockFragmentDoc,
    props
  );

  const localizedDate = makeDateString(date, { locale });

  return scheduleRows ? (
    <Container>
      <Date>{localizedDate}</Date>
      <Description>{description}</Description>
      <Schedule>
        {scheduleRows?.map((row, i) => {
          if (row?.__typename === "contentBlocks_scheduleRow_BlockType") {
            return (
              <div key={i} className={row.bold ? "bold" : ""}>
                <div>
                  {row.startTime}
                  {row.endTime && "-" + row.endTime}
                </div>
                <div> {row.description}</div>
              </div>
            );
          } else return null;
        })}
      </Schedule>
    </Container>
  ) : null;
};

const Date = styled.div`
  font-weight: bold;
`;

const Description = styled.div`
  margin: 2rem 0;
`;

const Schedule = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem;
  margin-top: 2rem;
  > div {
    display: grid;
    grid-template-columns: max-content 1fr;
    grid-gap: 30px;
    &.bold {
      font-weight: bold;
    }
  }
`;

export default ScheduleBlock;
