import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
  StyledLocalizationBar,
  StyledHeading,
  StyledRadioGroup,
  StyledRadioGroupLabel,
  StyledRadioGroupOption,
} from "./styles";
import UniqueIconComposer from "@/components/svg/UniqueIconComposer";

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
      value: "celsius",
      label: t("summit_dashboard.unit_localization.celsius"),
    },
    {
      value: "fahrenheit",
      label: t("summit_dashboard.unit_localization.fahrenheit"),
    },
  ];

  const windspeedOptions = [
    { value: "kn", label: t("summit_dashboard.unit_localization.knots") },
    {
      value: "mph",
      label: t("summit_dashboard.unit_localization.miles_per_hour"),
    },
    {
      value: "m/s",
      label: t("summit_dashboard.unit_localization.meters_per_second"),
    },
  ];

  return (
    <StyledLocalizationBar role="group" aria-labelledby={heading}>
      <StyledHeading id={heading}>
        <UniqueIconComposer icon="gear" size="calc(1em * (5/3))" />
        {t("summit_dashboard.unit_localization.settings")}
      </StyledHeading>
      <StyledRadioGroup
        value={tempUnit}
        aria-labelledby={temperatureLabel}
        onChange={(value) =>
          onTempChangeCallback && onTempChangeCallback(value)
        }
      >
        <StyledRadioGroupLabel id={temperatureLabel}>
          {t("summit_dashboard.unit_localization.label_temp")}
        </StyledRadioGroupLabel>
        {tempOptions.map(({ value, label }) => (
          <StyledRadioGroupOption key={value} value={value}>
            {label}
          </StyledRadioGroupOption>
        ))}
      </StyledRadioGroup>
      <StyledRadioGroup
        value={windspeedUnit}
        aria-labelledby={windspeedLabel}
        onChange={(value) =>
          onWindChangeCallback && onWindChangeCallback(value)
        }
      >
        <StyledRadioGroupLabel id={windspeedLabel}>
          {t("summit_dashboard.unit_localization.label_windspeed")}
        </StyledRadioGroupLabel>
        {windspeedOptions.map(({ value, label }) => (
          <StyledRadioGroupOption key={value} value={value}>
            {label}
          </StyledRadioGroupOption>
        ))}
      </StyledRadioGroup>
    </StyledLocalizationBar>
  );
};

UnitLocalization.propTypes = {
  tempUnit: PropTypes.oneOf(["celsius", "fahrenheit"]),
  windspeedUnit: PropTypes.oneOf(["kn", "mph", "m/s"]),
  onTempChangeCallback: PropTypes.func,
  onWindChangeCallback: PropTypes.func,
};

UnitLocalization.displayName = "Layout.UnitLocalization";

export default UnitLocalization;
