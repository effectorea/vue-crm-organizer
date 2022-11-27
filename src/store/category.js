import {getDatabase, ref, push} from "firebase/database";

export default {
  actions: {
    async createCategory({commit, dispatch}, {title, limit}) {
      try {
        const uid = await dispatch('getUserId')
        const db = getDatabase()
        const category = await push(ref(db, `/users/${uid}/categories`), {
          title, limit
        })
        return {title, limit, id: category.key}
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}