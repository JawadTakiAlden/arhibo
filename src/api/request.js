import axios from "axios";
import i18next from "i18next";

const client = axios.create({ baseURL: "https://api.dev1.gomaplus.tech/api"});
export const request = async ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token_admin_arhibo')}`;
  options.url = options.url + `?ln=${i18next.language}`
  return client(options).then((res) => res);
};
