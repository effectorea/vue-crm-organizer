import { getDatabase, ref, push, get, update } from "firebase/database";

export default {
  actions: {
    async fetchCategories({commit, dispatch}) {
      try {
        const uid = await dispatch('getUserId')
        const db = getDatabase()
        const categories = (await get(ref(db, `/users/${uid}/categories`))).toJSON() || {}
        // const cats = []
        // Object.keys(categories).forEach(key => {
        //   cats.push({
        //     title: categories[key].title,
        //     limit: categories[key].limit,
        //     id: key
        //   })
        // })
        // console.log(cats);
        // return cats

        return Object.keys(categories).map(key => ({...categories[key], id: key}))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateCategory({commit, dispatch}, {title, limit, id}) {
      const uid = await dispatch('getUserId')
      const db = getDatabase()
      await update(ref(db, `/users/${uid}/categories/${id}`), {
        title, limit
      })
    },
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