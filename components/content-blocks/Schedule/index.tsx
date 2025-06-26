import { FC } from "react";
import { FragmentType, useFragment } from "@/gql";
import { ScheduleBlockFragmentDoc } from "@/gql/graphql";
import { makeDateString } from "@/helpers/dates";
import { Container } from "@rubin-epo/epo-react-lib";
import styles from "./styles.module.css";

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
      <div className={styles.date}>{localizedDate}</div>
      <div className={styles.description}>{description}</div>
      <ol className={styles.schedule}>
        {scheduleRows?.map((row, i) => {
          if (row?.__typename === "contentBlocks_scheduleRow_BlockType") {
            return (
              <li key={i} data-bold={row.bold} className={styles.row}>
                <div>
                  {row.startTime}
                  {row.endTime && "-" + row.endTime}
                </div>
                <div> {row.description}</div>
              </li>
            );
          } else return null;
        })}
      </ol>
    </Container>
  ) : null;
};

export default ScheduleBlock;
