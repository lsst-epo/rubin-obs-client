import PropTypes from "prop-types";
import clsx from "clsx";
import GlobalDataContext from "@/contexts/GlobalData";
import { IconComposer } from "@rubin-epo/epo-react-lib";

export default function ContactInfo({ className }) {
  return (
    <GlobalDataContext.Consumer>
      {({ siteInfo: { contactInfo } }) => {
        if (!contactInfo || contactInfo.length < 1) return null;

        return (
          <ul
            className={clsx({
              "c-contact-info": true,
              [`${className}`]: !!className,
            })}
          >
            {contactInfo.map(({ id, typeHandle, text }) => (
              <li key={id} className="c-contact-info__item">
                <IconComposer
                  icon={typeHandle}
                  className="c-contact-info__icon"
                />
                <div
                  dangerouslySetInnerHTML={{ __html: text }}
                  className="c-content-rte"
                />
              </li>
            ))}
          </ul>
        );
      }}
    </GlobalDataContext.Consumer>
  );
}

ContactInfo.displayName = "Global.ContactInfo";

ContactInfo.propTypes = {
  className: PropTypes.string,
};
