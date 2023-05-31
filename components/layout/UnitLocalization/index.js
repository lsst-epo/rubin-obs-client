import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import UniqueIconComposer from "@/components/svg/UniqueIconComposer";
import * as Styled from "./styles";

const UnitLocalization = ({
  tempUnit,
  windspeedUnit,
  onTempChangeCallback,
  onWindChangeCallback,
}) => {
  const { t, i18n } = useTranslation();
  const heading = "unitLocalizationHeading";
  const temperatureLabel = "temperatureLabel";
  const windspeedLabel = "windspeedLabel";

  const tempOptions = [
    {
      value: "C",
      label: t("summit_dashboard.unit_localization.C"),
    },
    {
      value: "F",
      label: t("summit_dashboard.unit_localization.F"),
    },
  ];

  const windspeedOptions = [
    { value: "NM", label: t("summit_dashboard.unit_localization.NM") },
    {
      value: "mi",
      label: t("summit_dashboard.unit_localization.mi"),
    },
    {
      value: "m",
      label: t("summit_dashboard.unit_localization.m"),
    },
  ];

  return (
    <Styled.LocalizationBar role="group" aria-labelledby={heading}>
      <Styled.Heading id={heading}>
        <UniqueIconComposer icon="gear" />
        {t("summit_dashboard.unit_localization.settings")}
      </Styled.Heading>
      <Styled.RadioGroup
        value={tempUnit}
        aria-labelledby={temperatureLabel}
        onChange={(value) =>
          onTempChangeCallback && onTempChangeCallback(value)
        }
      >
        <Styled.RadioGroupLabel id={temperatureLabel}>
          {t("summit_dashboard.unit_localization.label_temp")}
        </Styled.RadioGroupLabel>
        {tempOptions.map(({ value, label }) => (
          <Styled.RadioGroupOption key={value} value={value}>
            {label}
          </Styled.RadioGroupOption>
        ))}
      </Styled.RadioGroup>
      <Styled.RadioGroup
        value={windspeedUnit}
        aria-labelledby={windspeedLabel}
        onChange={(value) =>
          onWindChangeCallback && onWindChangeCallback(value)
        }
      >
        <Styled.RadioGroupLabel id={windspeedLabel}>
          {t("summit_dashboard.unit_localization.label_windspeed")}
        </Styled.RadioGroupLabel>
        {windspeedOptions.map(({ value, label }) => (
          <Styled.RadioGroupOption key={value} value={value}>
            {label}
          </Styled.RadioGroupOption>
        ))}
      </Styled.RadioGroup>
    </Styled.LocalizationBar>
  );
};

UnitLocalization.propTypes = {
  tempUnit: PropTypes.oneOf(["C", "F"]),
  windspeedUnit: PropTypes.oneOf(["NM", "mi", "m"]),
  onTempChangeCallback: PropTypes.func,
  onWindChangeCallback: PropTypes.func,
};

UnitLocalization.displayName = "Layout.UnitLocalization";

export default UnitLocalization;
