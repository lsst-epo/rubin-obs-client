import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { formatDayName } from "@/helpers/formatters";
import * as Styled from "./styles";
import MoonTime from "./Time";

const DailyMoonrise = ({ data, labelledById }) => {
  const {
    t,
    i18n: { language = "en" },
  } = useTranslation();

  return (
    <Styled.Table aria-labelledby={labelledById}>
      <thead>
        <tr>
          <Styled.HeaderCell>
            {t("summit_dashboard.astro.daylight.day")}
          </Styled.HeaderCell>
          <Styled.HeaderCell>
            {t("summit_dashboard.astro.moonlight.moonrise")}
          </Styled.HeaderCell>
          <Styled.HeaderCell>
            {t("summit_dashboard.astro.moonlight.moonset")}
          </Styled.HeaderCell>
          <Styled.HeaderCell>
            {t("summit_dashboard.astro.moonlight.moonrise")}
          </Styled.HeaderCell>
        </tr>
      </thead>
      <tbody>
        {data.map(({ day, rise, set, azimuthRise, azimuthSet }) => {
          return (
            <tr key={rise}>
              <Styled.HeaderCell scope="row">
                {formatDayName(day, language)}
              </Styled.HeaderCell>
              <Styled.TableCell>
                {rise && rise < set ? (
                  <MoonTime time={rise} azimuth={azimuthRise} />
                ) : (
                  "—"
                )}
              </Styled.TableCell>
              <Styled.TableCell>
                {set && <MoonTime time={set} azimuth={azimuthSet} />}
              </Styled.TableCell>
              <Styled.TableCell>
                {rise && rise > set ? (
                  <MoonTime time={rise} azimuth={azimuthRise} />
                ) : (
                  "—"
                )}
              </Styled.TableCell>
            </tr>
          );
        })}
      </tbody>
    </Styled.Table>
  );
};

DailyMoonrise.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.number,
      rise: PropTypes.instanceOf(Date),
      set: PropTypes.instanceOf(Date),
      azimuthRise: PropTypes.number,
      azimuthSet: PropTypes.number,
    })
  ).isRequired,
  labelledById: PropTypes.string,
};

DailyMoonrise.displayName = "Widgets.Daily.Moonrise";

export default DailyMoonrise;
