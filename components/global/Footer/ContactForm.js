import { useState, useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { IconComposer } from "@rubin-epo/epo-react-lib";

const EMAIL_ID = "footerContactEmail";
const TOPIC_ID = "footerContactTopic";
const MESSAGE_ID = "footerContactMessage";
const POST_URL = process.env.NEXT_PUBLIC_CONTACT_FORM_POST_URL;

async function postFormData(data) {
  const url = POST_URL;
  const objectifiedData = Object.fromEntries(data);
  const body = JSON.stringify({
    ...objectifiedData,
    fromName: "",
    message: {
      body: objectifiedData.message,
      Topic: objectifiedData.topic,
    },
  });
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

function ContactForm({ topics = [], className }) {
  const { t } = useTranslation();
  const formRef = useRef(null);
  const emailInputRef = useRef(null);
  const [status, setStatus] = useState(null); // null, "sending", "error", "success"

  async function handleSubmit(event) {
    event.preventDefault();

    setStatus("sending");

    const formData = new FormData(event.target);

    await postFormData(formData)
      .then(() => {
        setStatus("success");
      })
      .catch((error) => {
        setStatus("error");
        console.error(error);
      });
  }

  function handleReset() {
    setStatus(null);
    formRef.current.reset();
    emailInputRef.current.focus();
  }

  return (
    <form
      ref={formRef}
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
          ref={emailInputRef}
          id={EMAIL_ID}
          name="fromEmail"
          type="email"
          autoComplete="email"
          placeholder={t("form.email")}
          required
          className="c-contact-form__input"
        />
      </div>
      {!!topics?.length && (
        <div className="c-contact-form__block">
          <label htmlFor={TOPIC_ID} className="a-hidden">
            {t("form.topic")}
          </label>
          <div className="c-contact-form__select-wrapper">
            <select
              id={TOPIC_ID}
              name="topic"
              className="c-contact-form__input c-contact-form__input--select"
            >
              {topics.map((topic) => (
                <option key={topic.id} value={topic.value}>
                  {topic.label}
                </option>
              ))}
            </select>
            <IconComposer
              icon="caretThin"
              className="c-contact-form__select-icon"
            />
          </div>
        </div>
      )}
      <div className="c-contact-form__block">
        <label htmlFor={MESSAGE_ID} className="a-hidden">
          {t("form.inquiry")}
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
        <input
          id="honeypot"
          name="honeypot"
          className="c-contact-form__honeypot"
          type="text"
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
              <button
                type="reset"
                onClick={handleReset}
                className="c-contact-form__reset"
              >
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
  topics: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
};

export default ContactForm;
