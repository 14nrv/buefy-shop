/* eslint-disable key-spacing */

import pkg from '@/store/modules/package'
import cart from '@/store/modules/cart'
import product from '@/store/modules/product'

export const fakeStore = {
  modules: {
    cart: {
      ...cart,
      actions: {
        addItem    : jest.fn(({ commit }, item) => commit('ADD_ITEM', item)),
        removeItem : jest.fn(({ commit }, item) => commit('REMOVE_ITEM', item))
      }
    },
    product: {
      ...product,
      actions: {
        switchSale      : jest.fn(({ commit }) => commit('SWITCH_SALE')),
        updateHighprice : jest.fn(({ commit }, value) => commit('UPDATE_HIGH_PRICE', value))
      }
    },
    pkg
  },
  strict: false
}
