"use client";
// react-i18next extends i18next's functionality
// params in this context are values passed into the translation key
// For docs on pluralization, see: https://www.i18next.com/translation-function/plurals
// USAGE:
/* <T i18nKey="userMessagesUnread" count={count}>
  Hello <strong title={t('nameTitle')}>{{name}}</strong>, you have {{count}} unread message. <Link to="/msgs">Go to messages</Link>.
</T> */
// HERE IS WHAT THE en.json looks like
// "userMessagesUnread": "Hello <1>{{name}}</1>, you have {{count}} unread message. <5>Go to message</5>.",
// "userMessagesUnread_plural": "Hello <1>{{name}}</1>, you have {{count}} unread messages.  <5>Go to messages</5>.",
// SEE: https://react.i18next.com/legacy-v9/trans-component

import PropTypes from "prop-types";
import { Trans, useTranslation } from "react-i18next";

const T = ({ children, components, i18nKey, translate, values }) => {
  const { t } = useTranslation();

  return i18nKey ? (
    <Trans i18nKey={i18nKey} components={components} values={values}>
      {children}
    </Trans>
  ) : translate ? (
    t(translate, { ...values })
  ) : (
    <></>
  );
};

T.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
    PropTypes.array,
  ]),
  components: PropTypes.object,
  translate: PropTypes.string,
  i18nKey: PropTypes.string,
  params: PropTypes.object,
  values: PropTypes.object,
};

export default T;
