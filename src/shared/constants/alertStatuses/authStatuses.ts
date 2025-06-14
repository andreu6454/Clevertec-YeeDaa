export const AUTH_LOGIN_STATUSES = {
    401: {
        status: 'error' as const,
        title: 'Неверный логин или пароль',
        description: 'Попробуйте снова',
    },
    403: {
        status: 'error' as const,
        title: 'E-mail не верифицирован',
        description: 'Проверьте почту и перейдите по ссылке',
    },
};

export const LOGIN_EXISTS = 'Пользователь с таким login уже существует.';
export const EMAIL_EXISTS = 'Пользователь с таким email уже существует.';
