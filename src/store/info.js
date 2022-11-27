import { getDatabase, ref, get } from "firebase/database";
export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = {}
    }
  },
  actions: {
    fetchInfo: async function({ dispatch, commit }) {
      try {
        const uid = await dispatch("getUserId");
        const db = getDatabase();
        const info = (await get(ref(db, `users/${uid}/info`))).toJSON();
        console.log(info);
        commit("setInfo", info);
      } catch (e) {

      }
    }
  },
  getters: {
    info: s => s.info
  }
}