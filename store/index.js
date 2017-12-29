import Vuex from 'vuex'
import pkg from '@/store/modules/package'
import cart from '@/store/modules/cart'
import product from '@/store/modules/product'

const store = () => {
  return new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
      cart,
      product,
      pkg
    }
  })
}

export default store