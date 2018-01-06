import { firebaseAction } from 'vuexfire'

export default {
  switchSale({ commit }) {
    commit('SWITCH_SALE')
  },
  updateHighprice({ commit }, value) {
    commit('UPDATE_HIGH_PRICE', value)
  },
  setProductsRef: firebaseAction(({ bindFirebaseRef }, ref) => {
    bindFirebaseRef('products', ref)
  })
}
