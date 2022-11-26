import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  actions: {
    login: async function({ dispatch, commit }, { email, password }) {
      try {
        console.log('thats ok')
        await signInWithEmailAndPassword(getAuth(),email, password)
      } catch (e) {
        throw e
      }
    }
  }
}