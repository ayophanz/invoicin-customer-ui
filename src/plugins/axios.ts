import axios from "axios";
import router from "../router/index.ts";
import { useToast } from "vue-toastification";
import services from "../services";
import { nextTick } from "vue";

const toast = useToast();
const maxRetry = 5;
let counter = 0;

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.common.Accept = "application/json";
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    /**
     * Unauthorized
     */
    if (error.response.status === 401) {
      const errorCode = error.response.data.code;

      /**
       * Token expired
       */
      if (errorCode === 40102) {
        if (
          router.currentRoute.value.meta.auth == true ||
          Object.keys(router.currentRoute.value.meta).length == 0
        ) {
          counter++;
          if (counter >= maxRetry) return Promise.reject(error);

          return nextTick(async () => {
            if (localStorage.getItem("refreshing_token") == null) {
              toast.info("Extending session...", {
                timeout: 2000,
              });
              await services.refreshToken();
              toast.success("Session extended!", {
                timeout: 2000,
              });
            }

            let config = error.config;
            config.headers.Authorization = `Bearer ${localStorage.getItem(
              "token"
            )}`;
            return new Promise((resolve) => {
              setTimeout(function () {
                resolve(axios.request(config));
              }, 2000);
            });
          });
        }
      }

      /**
       * Login required
       */
      if (errorCode === 40101) {
        localStorage.removeItem("token");
        localStorage.removeItem("@me:shared_me_state");
        axios.defaults.headers.common.Authorization = "";
        window.location.replace(`${window.location.origin}/login`);
      }
    }

    return Promise.reject(error);
  }
);

axios.interceptors.request.use((config) => {
  if (localStorage.getItem("token")) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return config;
});

export default axios;
