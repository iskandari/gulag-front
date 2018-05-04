import Immutable from 'immutable';
import { UPDATE } from 'react-intl-redux';

import ruLocale from '../../../intl/ru';
// import enLocale from '../../../intl/en';

// const locales = {
//   ru: ruLocale,
//   'ru-RU': ruLocale,
//   en: enLocale,
//   'en-US': enLocale
// };

// const { language, languages } = window.navigator;
// let defaultLocale = locales[language] ? locales[language] : enLocale;
//
// if (languages) {
//   for (let i = 0; i < languages.length; i += 1) {
//     if (locales[languages[i]]) {
//       defaultLocale = locales[languages[i]];
//       break;
//     }
//   }
// }

// const initialState = Immutable.fromJS(defaultLocale);
const initialState = Immutable.fromJS(ruLocale);

export default (state = initialState, action) => {
  if (action.type !== UPDATE) {
    return state;
  }

  return state.merge(action.payload);
};