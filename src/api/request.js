import axios, { AxiosError } from "axios";
import i18next from "i18next";
const client = axios.create({ baseURL: "https://api.ar7ebo.gomaplus.tech/api" });
client.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      localStorage.removeItem("token_admin_arhibo");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export const request = async ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("token_admin_arhibo")}`;
  options.params = {
    ...options.params,
    ln: i18next.language,
  };
  return client(options)
    .then((res) => res)
};
