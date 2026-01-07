import UniqueIconComposer from "@/components/svg/UniqueIconComposer";
import styles from "./styles.module.css";
import PropTypes from "prop-types";

const LocaleContextInfoBar = ({ time, date, location }) => {
  // Show if there is at least a date or time, and only if location is defined
  if ((time === undefined && date === undefined) || location === undefined) {
    return <></>;
  }
  return (
    <div className={styles.container}>
      {time && (
        <span className={styles.localeText}>
          <UniqueIconComposer className={styles.icon} icon="time" size={15} />
          {time}
        </span>
      )}
      {date && (
        <span className={styles.localeText}>
          <UniqueIconComposer
            className={styles.icon}
            icon="calendar"
            size={15}
          />
          {date}
        </span>
      )}
      <span className={styles.localeText}>
        <UniqueIconComposer className={styles.icon} icon="pin" size={15} />
        {location}
      </span>
    </div>
  );
};

LocaleContextInfoBar.propTypes = {
  time: PropTypes.string,
  date: PropTypes.string,
  location: PropTypes.string,
};

export default LocaleContextInfoBar;
