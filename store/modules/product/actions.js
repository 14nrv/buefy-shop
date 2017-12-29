export default {
  switchSale({ commit }) {
    commit('SWITCH_SALE')
  },
  updateHighprice({ commit }, value) {
    commit('UPDATE_HIGH_PRICE', value)
  }
}
