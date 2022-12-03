import { getDatabase, ref, push, get } from "firebase/database";

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
    },
    async fetchRecords({dispatch, commit}) {
      try {
        const uid = await dispatch('getUserId')
        const db = getDatabase()
        const records = (await get(ref(db, `/users/${uid}/records`))).toJSON() || {}
        return Object.keys(records).map(key => ({...records[key], id: key}))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecordsById({dispatch, commit}, id) {
      try {
        const uid = await dispatch('getUserId')
        const db = getDatabase()
        const record = ((await get(ref(db, `/users/${uid}/records`))).child(id)).toJSON() || {}
        return {...record, id: id}
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}