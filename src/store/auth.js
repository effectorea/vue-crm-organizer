import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

export default {
  actions: {
    login: async function({ dispatch, commit }, { email, password }) {
      try {
        console.log('thats ok')
        await signInWithEmailAndPassword(getAuth(),email, password)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async register({ dispatch, commit }, { email, password, name }) {
      try {
        console.log('thats ok')
        await createUserWithEmailAndPassword(getAuth(), email, password)
        const uid = await dispatch('getUserId')
        await set(ref(getDatabase(),`users/${uid}/info`),{
          bill: 10000,
          name
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    getUserId() {
      const user = getAuth().currentUser
      console.log(user?.uid)
      console.log(user);
      return user ? user.uid : null
    },
    async logout({commit}) {
      await signOut(getAuth())
      commit('clearInfo')
    }
  }
}