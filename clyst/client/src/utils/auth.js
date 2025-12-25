const TOKEN_KEY = "clyst_token";

export const loginUser = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const logoutUser = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const isAuthenticated = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};
