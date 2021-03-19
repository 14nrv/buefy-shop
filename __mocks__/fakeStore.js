import pkg from '@/store/modules/package'
import cart from '@/store/modules/cart'
import checkout from '@/store/modules/checkout'
import product from '@/store/modules/product'
import products from '@/__mocks__/products.json'

const fakeStore = {
  actions: {
    async nuxtServerInit({ dispatch }) {
      await dispatch('product/setProductsRef')
    }
  },
  modules: {
    pkg,
    cart,
    checkout,
    product: {
      ...product,
      actions: {
        ...product.actions,
        setProductsRef: jest.fn()
      },
      state: () => ({
        ...product.state(),
        products
      })
    }
  },
  strict: false
}

export default fakeStore
