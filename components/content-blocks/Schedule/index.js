import PropTypes from "prop-types";
import styled from "styled-components";
import { Container } from "@rubin-epo/epo-react-lib";
import { makeDateString } from "@/helpers/dates";

export default function ScheduleBlock({ date, description, scheduleRows }) {
  const localizedDate = makeDateString(date);
  return (
    <Container>
      <Date>{localizedDate}</Date>
      <Description>{description}</Description>
      <Schedule>
        {scheduleRows.map((row, i) => {
          return (
            <div key={i} className={row.bold ? "bold" : ""}>
              <div>
                {row.startTime}
                {row.endTime && "-" + row.endTime}
              </div>
              <div> {row.description}</div>
            </div>
          );
        })}
      </Schedule>
    </Container>
  );
}

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

ScheduleBlock.displayName = "ContentBlock.Schedule";

ScheduleBlock.propTypes = {
  date: PropTypes.string,
  description: PropTypes.string,
  scheduleRows: PropTypes.array,
};
