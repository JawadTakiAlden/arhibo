import axios from "axios";
import i18next from "i18next";
const client = axios.create({ baseURL: "https://api.dev1.gomaplus.tech/api"});
client.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      localStorage.removeItem('token_admin_arhibo')
      window.location.href = '/auth/login';
    }
  });
export const request = async ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token_admin_arhibo')}`;
  options.params = {
    ...options.params,
    ln : i18next.language
  }
  return client(options).then((res) => res);
};
