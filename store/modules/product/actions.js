import { firebaseAction } from 'vuexfire'
import { db } from '@/plugins/firebase'

export default {
  switchSale({ commit }) {
    commit('SWITCH_SALE')
  },
  updateHighprice({ commit }, value) {
    commit('UPDATE_HIGH_PRICE', value)
  },
  setProductsRef: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef('products', db.ref('products'))
  })
}
