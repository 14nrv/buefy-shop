import Vuex from 'vuex'
import { firebaseMutations } from 'vuexfire'
import pkg from '@/store/modules/package'
import cart from '@/store/modules/cart'
import checkout from '@/store/modules/checkout'
import product from '@/store/modules/product'

const store = () => {
  return new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
      cart,
      checkout,
      product,
      pkg
    },
    mutations: {
      ...firebaseMutations
    }
  })
}

export default store
