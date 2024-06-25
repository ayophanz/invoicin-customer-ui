import axios from "../plugins/axios";

const success = (response: string, resolve: (resolve: string) => void) => {
  localStorage.setItem("token", response);
  axios.defaults.headers.common.Authorization = `Bearer ${response}`;
  resolve(response);
};

const fail = (error: object, reject: (reject: object) => void) => {
  reject(error);
};

export default () => {
  return new Promise((resolve, reject) => {
    axios
      .get("api/refresh")
      .then((response) => {
        success(response.data.token, resolve);
      })
      .catch((error) => {
        fail(error.response.data, reject);
      });
  });
};
