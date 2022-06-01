import { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import withLiveRegionChange from "@/hoc/withLiveRegionChange";

const EMAIL_ID = "footerContactEmail";
const MESSAGE_ID = "footerContactMessage";
// const POST_URL = process.env.NEXT_PUBLIC_CONTACT_FORM_POST_URL;
// Should be replaced with an env var
const POST_URL = "something";

async function postFormData(data) {
  const url = POST_URL;
  const body = JSON.stringify(Object.fromEntries(data));
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    withCredentials: true,
    body,
  });
  return response.json();
}

function ContactForm({ className }) {
  const { t } = useTranslation();
  const [status, setStatus] = useState(null); // null, "sending", "error", "success"

  async function handleSubmit(event) {
    event.preventDefault();

    setStatus("sending");

    const formData = new FormData(event.target);

    await postFormData(formData)
      .then(({ data }) => {
        if (data.success) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      })
      .catch((error) => {
        setStatus("error");
        console.error(error);
      });
  }

  return (
    <form
      method="post"
      action=""
      onSubmit={handleSubmit}
      className={classNames({
        "c-contact-form": true,
        [`${className}`]: !!className,
      })}
    >
      <div className="c-contact-form__block">
        <label htmlFor={EMAIL_ID} className="a-hidden">
          {t("form.email")}
        </label>
        <input
          id={EMAIL_ID}
          name="fromEmail"
          type="email"
          autoComplete="email"
          placeholder={t("form.email")}
          required
          className="c-contact-form__input"
        />
      </div>
      <div className="c-contact-form__block">
        <label htmlFor={MESSAGE_ID} className="a-hidden">
          Inquiry
        </label>
        <textarea
          id={MESSAGE_ID}
          name="message"
          placeholder={t("form.inquiry")}
          required
          className="c-contact-form__input"
        />
      </div>
      <div className="c-contact-form__block">
        <button
          type="submit"
          className="c-contact-form__submit c-buttonish"
          disabled={status === "success"} // prevent second submission until reset
        >
          {status === "sending" ? t("form.sending") : t("form.send")}
        </button>
      </div>
      <div className="c-contact-form__block" aria-live="polite">
        <p className="c-contact-form__status">
          {status === "success" && (
            <>
              {t("contact-form.success")}{" "}
              <button type="reset" className="c-contact-form__reset">
                {t("form.reset")}
              </button>
              {"."}
            </>
          )}
          {status === "error" && t("contact-form.error")}
        </p>
      </div>
    </form>
  );
}

ContactForm.displayName = "Global.Footer.ContactForm";

ContactForm.propTypes = {
  className: PropTypes.string,
};

export default withLiveRegionChange(ContactForm);
