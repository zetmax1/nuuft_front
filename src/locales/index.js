import common from './common';
import footer from './footer';
import about from './about';
import faculties from './faculties';
import education from './education';
import science from './science';
import enlightenment from './enlightenment';
import news from './news';
import features from './features';
import home from './home';
import admission from './admission';
import structure from './structure';
import leaders from './leaders';
import departments from './departments';
import symbols from './symbols';
import vacancies from './vacancies';
import appeal from './appeal';

export const translations = {
  uz: {
    common: common.uz,
    footer: footer.uz,
    about: about.uz,
    faculties: faculties.uz,
    education: education.uz,
    science: science.uz,
    enlightenment: enlightenment.uz,
    news: news.uz,
    features: features.uz,
    home: home.uz,
    admission: admission.uz,
    structure: structure.uz,
    leaders: leaders.uz,
    departments: departments.uz,
    symbols: symbols.uz,
    vacancies: vacancies.uz,
    appeal: appeal.uz,
  },
  ru: {
    common: common.ru,
    footer: footer.ru,
    about: about.ru,
    faculties: faculties.ru,
    education: education.ru,
    science: science.ru,
    enlightenment: enlightenment.ru,
    news: news.ru,
    features: features.ru,
    home: home.ru,
    admission: admission.ru,
    structure: structure.ru,
    leaders: leaders.ru,
    departments: departments.ru,
    symbols: symbols.ru,
    vacancies: vacancies.ru,
    appeal: appeal.ru,
  },
  en: {
    common: common.en,
    footer: footer.en,
    about: about.en,
    faculties: faculties.en,
    education: education.en,
    science: science.en,
    enlightenment: enlightenment.en,
    news: news.en,
    features: features.en,
    home: home.en,
    admission: admission.en,
    structure: structure.en,
    leaders: leaders.en,
    departments: departments.en,
    symbols: symbols.en,
    vacancies: vacancies.en,
    appeal: appeal.en,
  }
};

export const getTranslation = (lang, key) => {
  const keys = key.split('.');
  let current = translations[lang] || translations['uz'];
  
  for (const k of keys) {
    if (current && current[k]) {
      current = current[k];
    } else {
      // Fallback object to 'uz' and try finding it there to prevent crashes
      let fallback = translations['uz'];
      for (const fallK of keys) {
        if (fallback && fallback[fallK]) fallback = fallback[fallK];
        else return key; // return key if not found in fallback either
      }
      return fallback;
    }
  }
  return current;
};
