import { getDatabase, ref, push } from "firebase/database";

export default {
  actions: {
    async createRecord({dispatch, commit}, record) {
      try {
        const uid = await dispatch('getUserId')
        const db = getDatabase()
        await push(ref(db,`users/${uid}/records`), record)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}