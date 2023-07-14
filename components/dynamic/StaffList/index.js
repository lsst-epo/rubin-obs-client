import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Grid } from "@rubin-epo/epo-react-lib";
import DataList from "@/dynamic/DataList";
import Tile from "@/atomic/Tile";

const StaffList = ({
  component,
  excludeId = null,
  header,
  limit = 15,
  button,
  isWide = false,
  isRelatedList = false,
}) => {
  const { t } = useTranslation();
  const cols = limit === 4 ? 4 : 3;

  return (
    <DataList
      component={component}
      excludeId={excludeId}
      limit={limit}
      section="staffProfiles"
      header={header}
      width={isWide ? "regular" : "narrow"}
      footerButton={button}
      isRelatedList={isRelatedList}
      loaderDescription={t("staff.loading")}
    >
      {({ entries }) => (
        <>
          {entries?.length > 0 && (
            <Grid columns={cols}>
              {entries.map(({ id, plainText, image, title, uri }) => (
                <Tile
                  key={id}
                  title={title}
                  titleTag={"h2"}
                  text={plainText}
                  image={image?.[0]}
                  link={uri}
                  type={"staffProfiles"}
                />
              ))}
            </Grid>
          )}
        </>
      )}
    </DataList>
  );
};

StaffList.propTypes = {
  component: PropTypes.string,
  excludeId: PropTypes.string,
  limit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  header: PropTypes.string,
  button: PropTypes.object,
  isWide: PropTypes.bool,
  isRelatedList: PropTypes.bool,
};

export default StaffList;
