import PropTypes from "prop-types";
import Link from "next/link";
import classNames from "classnames";
import IconComposer from "@/svg/IconComposer";

function NavItem({ href, onClick, title, theme, className, icon }) {
  // eslint-disable-next-line react/prop-types
  const WrapperTag = ({ href, children }) =>
    href ? (
      <Link href={href} passHref>
        {children}
      </Link>
    ) : (
      <>{children}</>
    );
  const InteractiveTag = href ? "a" : "button";

  return (
    <WrapperTag>
      {/* eslint-disable */}
      <InteractiveTag
        href={href}
        onClick={onClick}
        className={classNames({
          "c-nav-list__link": true,
          [`c-nav-list__link--${theme}`]: !!theme,
          [className]: !!className,
        })}
      >
        {/* eslint-enable */}
        {icon && <IconComposer icon={icon} className="c-nav-list__link-icon" />}
        <span className="c-nav-list__link-text">{title}</span>
      </InteractiveTag>
    </WrapperTag>
  );
}

NavItem.displayName = "Header.Navigation.NavItem";

NavItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  href: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.string,
};

export default NavItem;
