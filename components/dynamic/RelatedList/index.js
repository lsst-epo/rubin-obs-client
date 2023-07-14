import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import striptags from "striptags";
import { Grid } from "@rubin-epo/epo-react-lib";
import DataList from "@/dynamic/DataList";
import Tile from "@/atomic/Tile";

const RelatedList = ({
  button,
  excludeId = null,
  header,
  limit = 3,
  isWide = true,
  gridType = "pages",
}) => {
  const { t } = useTranslation();
  const cols = limit === 4 ? 4 : 3;

  return (
    <DataList
      excludeId={excludeId}
      limit={limit}
      section="pages"
      header={header}
      width={isWide ? "regular" : "narrow"}
      footerButton={button}
      loaderDescription={t("related-content-loading")}
    >
      {({ entries }) => (
        <>
          {entries?.length > 0 && (
            <Grid columns={cols}>
              {entries.map(({ id, description, image, title, uri }, i) => (
                <Tile
                  key={id}
                  image={image?.[0]}
                  link={uri}
                  text={striptags(description)}
                  title={title}
                  titleTag={"h2"}
                  type={gridType}
                />
              ))}
            </Grid>
          )}
        </>
      )}
    </DataList>
  );
};

RelatedList.propTypes = {
  excludeId: PropTypes.string,
  limit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  header: PropTypes.string,
  button: PropTypes.object,
  isWide: PropTypes.bool,
  gridType: PropTypes.string,
};

export default RelatedList;
