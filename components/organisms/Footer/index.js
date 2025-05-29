import Social from "./Social";
import Links from "./Links";
import ContactForm from "./ContactForm";
import { Image } from "@rubin-epo/epo-react-lib";
import getFooter from "@/services/craft/globals/footer";
import getContactForm from "@/services/craft/globals/contactForm";
import { useTranslation } from "@/lib/i18n";

export default async function Footer() {
  const footer = await getFooter();
  const contactForm = await getContactForm();
  const { t } = await useTranslation();

  if (!footer) return null;

  const { links, colophon, supportersLogos, supportersLogosAlt } = footer;

  const supportersImage = supportersLogos && supportersLogos[0];

  return (
    <footer className="c-global-footer">
      <Social />
      <Links links={links} />
      <div className="c-global-footer__main">
        <div className="c-global-footer__form-block">
          <h3 className="c-global-footer__heading">
            {t("contact-form.contact-us")}
          </h3>
          {contactForm && (
            <ContactForm
              topics={contactForm.contactFormTopics}
              className="c-global-footer__form"
            />
          )}
        </div>
        <div data-cy="colophon" className="c-global-footer__colophon-block">
          {colophon && (
            <div
              dangerouslySetInnerHTML={{ __html: colophon }}
              className="c-content-rte c-global-footer__colophon"
            />
          )}
        </div>
        <div className="c-global-footer__sponsors-block">
          {supportersImage && (
            <Image image={supportersImage} title={supportersLogosAlt} />
          )}
        </div>
      </div>
    </footer>
  );
}

Footer.displayName = "Global.Footer";
