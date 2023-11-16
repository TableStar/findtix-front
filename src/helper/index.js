export const getToken = () => {
  return localStorage.getItem("token");
};
export const removeToken = () => {
  localStorage.removeItem("token");
};
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const API_URL = import.meta.env.VITE_API_URL;
