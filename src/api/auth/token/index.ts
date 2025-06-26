const TOKEN_KEY = 'lm-publisher-token';

const saveToken = (token: string) => {
  sessionStorage.setItem(TOKEN_KEY, token.replace('Bearer ', ''));
};

const getToken = () => {
  return sessionStorage.getItem(TOKEN_KEY);
};

const removeTokenFromStorage = () => {
  sessionStorage.removeItem(TOKEN_KEY);
};

export { saveToken, getToken, removeTokenFromStorage };
