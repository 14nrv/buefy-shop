/* eslint-disable no-return-assign */

const calculateAmount = obj =>
  Object.values(obj)
    .reduce((acc, { count, price }) => acc + (count * price), 0)
    .toFixed(2)

export default {
  ADD_ITEM: (state, item) => {
    state.total++
    if (item.name in state.cart) {
      state.cart[item.name].count++
    } else {
      let stateItem = { ...item }
      stateItem.count = 1
      state.cart[item.name] = stateItem
    }
    state.amount = calculateAmount(state.cart)
  },
  REMOVE_ITEM: (state, item) => {
    state.total = state.total - item.count
    delete state.cart[item.name]
    state.amount = calculateAmount(state.cart)
  },
  CLEAR_CONTENTS: state => state.cart = {},
  CLEAR_COUNT: state => state.total = 0
}
