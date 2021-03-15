import { firebaseAction } from 'vuexfire'
import { db } from '@/plugins/firebase'

export default {
  switchSale: ({ commit }, value) =>
    commit('SWITCH_SALE', value),
  updateHighprice: ({ commit }, value) =>
    commit('UPDATE_HIGH_PRICE', value),
  setCategory: ({ commit }, value) =>
    commit('SET_CATEGORY', value),
  setProductsRef: firebaseAction(({ bindFirebaseRef }) =>
    bindFirebaseRef('products', db.ref('products'))
  )
}
