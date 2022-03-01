import PropTypes from "prop-types";
import Link from "next/link";
import classNames from "classnames";

function NavItem({ href, onClick, title, theme, className }) {
  const Tag = href ? Link : "button";
  const tagProps = {
    onClick,
    ...(href && {
      href,
      passHref: true,
    }),
  };
  return (
    <Tag {...tagProps}>
      {/* eslint-disable */}
      <a
        onClick={onClick}
        className={classNames({
          "c-nav-list__link": true,
          [`c-nav-list__link--${theme}`]: !!theme,
          [className]: !!className,
        })}
      >
        {/* eslint-enable */}
        <span className="c-nav-list__link-text">{title}</span>
      </a>
    </Tag>
  );
}

NavItem.displayName = "Header.Navigation.NavItem";

NavItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  href: PropTypes.string,
  className: PropTypes.string,
};

export default NavItem;
