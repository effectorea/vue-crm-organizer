import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth"
import info from "./info"
import category from "@/store/category";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null
  },
  getters: {
    error: state => state.error
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    async loadCurrency() {
      const key = process.env.VUE_APP_FIXER
      const res = await fetch(`https://api.apilayer.com/fixer/latest?symbols=USD,EUR,RUB`, {
        headers: {
          apikey: key
        }
      })
      return await res.json()
    }
  },
  modules: {
    auth,
    info,
    category
  },
});
