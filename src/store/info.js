import { getDatabase, ref, get, update } from "firebase/database";
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
    async updateInfo({dispatch, commit, getters}, toUpdate) {
      try {
        const uid = await dispatch('getUserId')
        const db = getDatabase()
        const updateData = {...getters.info, ...toUpdate}
        await update(ref(db, `/users/${uid}/info`), updateData)
        commit('setInfo', updateData)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch("getUserId");
        const db = getDatabase();
        const info = (await get(ref(db, `users/${uid}/info`))).toJSON();
        commit("setInfo", info);
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  getters: {
    info: s => s.info
  }
}