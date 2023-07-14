import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Grid, IconComposer } from "@rubin-epo/epo-react-lib";
import DataList from "@/dynamic/DataList";
import Tile from "@/atomic/Tile";
import { checkIfBetweenDates, createLocationString } from "@/lib/utils";
import * as Styled from "./styles";

const JobList = ({
  button,
  excludeId = null,
  header,
  limit = 20,
  isWide = false,
  gridType = "jobs",
}) => {
  const { t } = useTranslation();
  const cols = limit === 20 ? 2 : 4;

  return (
    <DataList
      excludeId={excludeId}
      limit={limit}
      section="jobs"
      header={header}
      width={isWide ? "regular" : "narrow"}
      footerButton={button}
      loaderDescription={t("jobs.loading")}
    >
      {({ entries }) => (
        <>
          {entries?.length > 0 && (
            <Grid columns={cols}>
              {entries.map(
                (
                  {
                    closeDate,
                    id,
                    subLocation,
                    jobPosition,
                    openDate,
                    title,
                    externalUrl,
                  },
                  i
                ) => {
                  // logic for displaying city/state in US, city/country outside
                  const Location = (
                    <Styled.LocationWrapper>
                      <IconComposer icon="Pin" />
                      <span>
                        {`${subLocation?.[0].title} | ${createLocationString(
                          subLocation?.[0].city,
                          subLocation?.[0].state,
                          subLocation?.[0].country
                        )}`}
                      </span>
                    </Styled.LocationWrapper>
                  );

                  // logic for open/closed
                  const checkOpen = checkIfBetweenDates(openDate, closeDate)
                    ? "open"
                    : "closed";
                  const lock = checkOpen === "open" ? "LockOpen" : "LockClosed";

                  return (
                    <Tile
                      className={checkOpen === "closed" ? "closed" : null}
                      key={id}
                      footer={
                        checkOpen && {
                          sticker: (
                            <Styled.Sticker>
                              <IconComposer icon={lock} />
                              <span>{t(`jobs.${checkOpen}`)}</span>
                            </Styled.Sticker>
                          ),
                        }
                      }
                      link={externalUrl}
                      pretitle={
                        jobPosition?.[0]?.title ? jobPosition[0].title : " "
                      }
                      subtitle={Location}
                      title={title}
                      titleTag={"h2"}
                      type={gridType}
                    />
                  );
                }
              )}
            </Grid>
          )}
        </>
      )}
    </DataList>
  );
};

JobList.propTypes = {
  excludeId: PropTypes.string,
  limit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  header: PropTypes.string,
  button: PropTypes.object,
  isWide: PropTypes.bool,
  gridType: PropTypes.string,
};

export default JobList;
