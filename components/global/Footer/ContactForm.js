import { useState, useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import axios from "axios";
import withLiveRegionChange from "@/hoc/withLiveRegionChange";

const EMAIL_ID = "footerContactEmail";
const MESSAGE_ID = "footerContactMessage";
// const POST_URL = process.env.NEXT_PUBLIC_CONTACT_FORM_POST_URL;
// Should be replaced with an env var
const POST_URL = "something";

function ContactForm({ className, setLiveRegionMessage }) {
  const { t } = useTranslation();
  const emailInput = useRef();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null); // null, "sending", "error", "success"

  function handleSubmit(event) {
    event.preventDefault();

    setStatus("sending");

    axios({
      method: "POST",
      url: POST_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
      data: {
        message: message,
        fromEmail: email,
      },
    }).then(({ data }) => {
      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    });
  }

  function handleReset() {
    setEmail("");
    setMessage("");
    setStatus(null);
    setLiveRegionMessage("Contact form reset.");
    if (emailInput.current) emailInput.current.focus();
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
          ref={emailInput}
          name="fromEmail"
          type="email"
          autoComplete="email"
          value={email}
          placeholder={t("form.email")}
          onChange={(event) => setEmail(event.target.value)}
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
          value={message}
          placeholder={t("form.inquiry")}
          onChange={(event) => setMessage(event.target.value)}
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
              <button
                type="button"
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
  setLiveRegionMessage: PropTypes.func,
};

export default withLiveRegionChange(ContactForm);
