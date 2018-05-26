/* eslint-disable key-spacing */

import pkg from '@/store/modules/package'
import cart from '@/store/modules/cart'
import checkout from '@/store/modules/checkout'
import product from '@/store/modules/product'
import products from '@/__tests__/__mocks__/products.json'

const fakeStore = {
  modules: {
    cart,
    checkout,
    product: {
      ...product,
      actions: {
        ...product.actions,
        setProductsRef: jest.fn(() => {
          fakeStore.modules.product.state.products = products
        })
      }
    },
    pkg
  },
  strict: false
}

export default fakeStore
