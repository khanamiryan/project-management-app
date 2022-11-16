import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import Backend from 'i18next-http-backend';
i18n
  // .use(Backend)
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    resources: {
      en: {
        translation: {
          signUpTitle: 'Sign Up',
          signInTitle: 'Sign In',
          logOut: 'Log out',
          sureDeleteUser: 'Are you sure to delete user?',
          menu: {
            mainPage: 'Main Page',
            profilePage: 'Профиль',
          },
          form: {
            noAccount: "Don't have an account? Sign Up",
            haveAccount: 'Have an account? Sign in',
            fields: {
              signup: 'Sign Up',
              signIn: 'Sign in',
              password: 'Password',
              newPassword: 'New password',
              login: 'Login',
              name: 'Name',
              save: 'Save',
              deleteUser: 'Delete User',
            },
            errors: {
              noName: 'Name is required',
              shortName: 'Name is too short',
              noLogin: 'Login is required',
              shortLogin: 'Login is too short',
              noPassword: 'Password is required',
              shortPassword: 'Password is too short',
            },
          },
        },
      },
      ru: {
        translation: {
          signUpTitle: 'Регистрация',
          signInTitle: 'Регистрация',
          logOut: 'Выйти',
          sureDeleteUser: 'Вы уверены, что хотите удалить пользователя?',

          menu: {
            mainPage: 'Главная',
            profilePage: 'Профиль',
          },
          form: {
            noAccount: 'Нет аккаунта? Зарегистрируйтесь',
            haveAccount: 'Уже есть аккаунт? Войдите',
            fields: {
              signIn: 'Войти',
              signup: 'Зарегистрироваться',
              password: 'Пароль',
              newPassword: 'Новый пароль',
              login: 'Логин',
              name: 'Имя',
              save: 'Сохранить',
              deleteUser: 'Удалить пользователя',
            },
            errors: {
              noName: 'Имя обязательно',
              shortName: 'Имя слишком короткое',
              noLogin: 'Логин обязателен',
              shortLogin: 'Логин слишком короткий',
              noPassword: 'Пароль обязателен',
              shortPassword: 'Пароль слишком короткий',
            },
          },
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

export default i18n;
