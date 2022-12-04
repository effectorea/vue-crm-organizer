import Vue from "vue";
import App from "./App.vue";
import VueMeta from 'vue-meta'
import {Vuelidate} from "vuelidate";
import Paginate from 'vuejs-paginate';
import "./registerServiceWorker";
import dateFilter from "@/filters/date.filter";
import router from "./router";
import store from "./store";
import Loader from "@/components/Loader"
import directiveTooltip from "@/directives/directive.tooltip";
import messagePlugin from "@/utils/message.plugin";
import titlePlugin from "@/utils/title.plugin";

import "materialize-css/dist/js/materialize.min";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import currencyFilter from "@/filters/currency.filter";
import localizeFilter from "@/filters/localize.filter";

Vue.config.productionTip = false;

Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)
Vue.directive('tooltip', directiveTooltip)

const firebaseConfig = {
  apiKey: "AIzaSyBtGHMkJRz1CB7BbWUDyUytc0kJaJ-63m8",
  authDomain: "vue-crm-d3ca9.firebaseapp.com",
  projectId: "vue-crm-d3ca9",
  storageBucket: "vue-crm-d3ca9.appspot.com",
  messagingSenderId: "176743044295",
  appId: "1:176743044295:web:e26ddbdb8dd21fb3879ae2",
  measurementId: "G-V05EY3VJER"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

let application

getAuth().onAuthStateChanged(() => {
    if (!application) {
      application = new Vue({
        router,
        store,
        render: (h) => h(App),
      }).$mount("#app");
    }
})










