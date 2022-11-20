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

          sureDeleteUser: 'Are you sure to delete user?',
          menu: {
            mainPage: 'Main Page',
            profilePage: 'Profile',
            signIn: 'Sign In',
            signUp: 'Sign Up',
            signOut: 'Sign Out',
            boards: 'Boards',
            addBoard: 'Add board',
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
          boards: {
            myBoards: 'My boards',
            serverError: 'Oops! A Server error occurred.',
            roleIsOwner: 'Role: owner',
            roleIsContributor: 'Role: contributor',
            open: 'OPEN BOARD',
            toast: {
              onSuccesDelete: 'You deleted the board',
              onSuccesLeave: 'You left the board',
            },
          },
          modal: {
            cancel: 'Cancel',
            confirm: 'Confirm',
            board: {
              onDeleteTitle: 'Delete the board',
              onLeaveTitle: 'Leave the board',
              onDeleteText:
                "It's irreversible. If you delete this board, you won't be able to restore it.",
              onLeaveText:
                "It's irreversible. If you leave this board, you won't be able to restore it.",
              onCreateTitle: 'Title',
              errorTitleMessage: 'Title is required',
              share: 'Share',
            },
          },
        },
      },
      ru: {
        translation: {
          signUpTitle: 'Регистрация',
          signInTitle: 'Вход',

          sureDeleteUser: 'Вы уверены, что хотите удалить пользователя?',

          menu: {
            mainPage: 'Главная',
            profilePage: 'Профиль',
            signIn: 'Вход',
            signUp: 'Регистрация',
            signOut: 'Выйти',
            boards: 'Доски',
            addBoard: 'Добавить доску',
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
          boards: {
            myBoards: 'Мои доски',
            serverError: 'Ой! Сервер вернул ошибку.',
            roleIsOwner: 'Роль: владелец',
            roleIsContributor: 'Роль: участник',
            open: 'ОТКРЫТЬ ДОСКУ',
            toast: {
              onSuccesDelete: 'Вы удалили доску',
              onSuccesLeave: 'Вы покинули доску',
            },
          },
          modal: {
            cancel: 'Отмена',
            confirm: 'Подтвердить',
            board: {
              onDeleteTitle: 'Удалить доску',
              onLeaveTitle: 'Покинуть доску',
              onDeleteText:
                'Это необратимое действие. Если вы удалите доску, то не сможете ее восстановить',
              onLeaveText:
                'Это необратимое действие. Если вы покините доску, то не сможете ее восстановить',
              onCreateTitle: 'Название',
              errorTitleMessage: 'Поле должно быть заполнено',
              share: 'Поделиться',
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
