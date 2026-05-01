import axios from 'axios';

const supportedLangs = ['uz', 'ru', 'en'];

const getLang = () => {
  const pathLang = window.location.pathname.split('/')[1];
  return supportedLangs.includes(pathLang) ? pathLang : 'uz';
};

// Patch axios.create() instances — covers newsApi, facultiesApi, vacanciesApi, etc.
const originalCreate = axios.create;
axios.create = function(config) {
  const instance = originalCreate.call(this, config);
  instance.interceptors.request.use(req => {
    req.headers['Accept-Language'] = getLang();
    return req;
  });
  return instance;
};

// Global interceptor — covers bare axios.get() calls in admissionApi,
// activitiesApi, collaborationApi, enlightenmentApi.
axios.interceptors.request.use(req => {
  req.headers['Accept-Language'] = getLang();
  return req;
});
