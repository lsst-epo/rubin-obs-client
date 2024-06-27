import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Grid } from "@rubin-epo/epo-react-lib";
import DataList from "@/dynamic/DataList";
import Tile from "@/atomic/Tile";
import { makeTruncatedString } from "@/lib/utils";

const DataProductsList = ({
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
      section="dataProducts"
      header={header}
      width={isWide ? "regular" : "narrow"}
      footerButton={button}
      isRelatedList={isRelatedList}
      loaderDescription={t("loading")}
    >
      {({ entries }) => (
        <>
          {entries?.length > 0 && (
            <Grid columns={cols}>
              {entries.map(({ id, description, image, title, uri }) => (
                <Tile
                  key={id}
                  title={title}
                  text={makeTruncatedString(description, 30)}
                  image={image?.[0]}
                  link={uri}
                  type="pages"
                  showSharePopup
                />
              ))}
            </Grid>
          )}
        </>
      )}
    </DataList>
  );
};

DataProductsList.propTypes = {
  component: PropTypes.string,
  excludeId: PropTypes.string,
  limit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  header: PropTypes.string,
  button: PropTypes.object,
  isWide: PropTypes.bool,
  isRelatedList: PropTypes.bool,
};

export default DataProductsList;
