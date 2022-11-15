import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
i18n
  .use(Backend)
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    resources: {
      en: {
        translation: {
          signin: 'Sign in',
          password: 'Password',
          login: 'Login',
          noAccount: "Don't have an account? Sign Up",
        },
      },
      ru: {
        translation: {
          signin: 'Войти',
          password: 'Пароль',
          login: 'Логин',
          noAccount: 'Нет аккаунта? Зарегистрируйтесь',
        },
      },
    },
    fallbackLng: 'en',
    supportedLngs: ['ru', 'en'],
    detection: {
      order: ['cookie'],
      caches: ['cookie'],
    },
    interpolation: { escapeValue: false },
  });
console.log(i18n.t('users:signin'));
export default i18n;
