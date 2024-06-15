import { createApp, h } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router/index";
import singleSpaVue from "single-spa-vue";
import floatingVue from "floating-vue";
import Toast from "vue-toastification";

const toastOptions = {
  // You can set your default options here
};

const pinia = createPinia();
const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(App, {
        props: {
          // single-spa props are available on the "this" object. Forward them to your component as needed.
          // https://single-spa.js.org/docs/building-applications#lifecyle-props
          name: this.name,
          // mountParcel: this.mountParcel,
          // singleSpa: this.singleSpa,
        },
      });
    },
  },
  handleInstance: (app) => {
    app.use(pinia);
    app.use(router);
    app.use(floatingVue);
    app.use(Toast, toastOptions);
  },
});

export const { bootstrap } = vueLifecycles;
export const { mount } = vueLifecycles;
export const { unmount } = vueLifecycles;
