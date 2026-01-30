import { createStore } from "vuex";
import store from "../store"

const vuestore = createStore(store);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(vuestore);
});