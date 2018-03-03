export default {
  addItem({ commit }, item) {
    commit('ADD_ITEM', item)
  },
  removeItem({ commit }, item) {
    commit('REMOVE_ITEM', item)
  },
  clearCount({ commit }) {
    commit('CLEAR_COUNT')
  },
  clearContents({ commit }) {
    commit('CLEAR_CONTENTS')
  }
}
