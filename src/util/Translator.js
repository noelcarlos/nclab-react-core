//import * as RNLocalize from "react-native-localize";
//import { getLanguages } from 'react-native-i18n';
//import I18n from 'react-native-i18n'; 
//import { I18nManager } from "react-native";

import I18n from "i18n-js";
//import * as RNLocalize from "react-native-localize";
import memoize from "lodash.memoize";

export const _t = memoize(
  (key, config) => I18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);

/*getLanguages().then(languages => {
  console.log(languages); // ['en-US', 'en']
});*/

export const setI18nConfig = (handleLocalizationChange, translationGetters) => {
  // fallback if no available language fits
  const fallback = { languageTag: handleLocalizationChange, isRTL: false };

  //const locales = RNLocalize.getLocales();

  /*I18n.getCurrentLocale();

  console.log("locales", I18n.getCurrentLocale());*/

  const { languageTag } =
    //RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;

  //console.log("calculated locale:", fallback);

  // clear translation cache
  _t.cache.clear();
  // update layout direction
  //I18nManager.forceRTL(isRTL);
  // set i18n-js config
  I18n.translations = { [languageTag]: translationGetters[languageTag]() };
  I18n.locale = languageTag;

  //console.log("Idioma establecido:", I18n.locale);
};
