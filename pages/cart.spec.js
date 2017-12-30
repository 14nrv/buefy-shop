import Vuex from 'vuex'
import Helpers from 'mwangaben-vthelpers'
import { shallow, createLocalVue } from 'vue-test-utils'
import { fakeStore } from '@/store/__mocks__/fakeStore'
import Cart from './cart'

const localVue = createLocalVue()
localVue.use(Vuex)

const cartModule = fakeStore.modules.cart
let wrapper, b, store

const calculateAmount = array =>
  array
    .reduce((acc, { count, price }) => acc + (count * price), 0)
    .toFixed(2)

cartModule.state.cart = {
  'Khaki Suede Polish Work Boots': {
    article: 'shoe',
    category: 'women',
    count: 2,
    img: 'shoe1.png',
    name: 'Khaki Suede Polish Work Boots',
    price: 149.99,
    sale: true
  },
  'Camo Fang Backpack Jungle': {
    article: 'jacket',
    category: 'women',
    count: 1,
    img: 'jacket1.png',
    name: 'Camo Fang Backpack Jungle',
    price: 39.99,
    sale: false
  }
}

const productsInCartState = Object.values(cartModule.state.cart)

cartModule.state.amount = calculateAmount(productsInCartState)
cartModule.state.total =
  productsInCartState
    .reduce((acc, { count }) => acc + count, 0)

describe('Cart', () => {
  beforeEach(() => {
    store = new Vuex.Store(fakeStore)
    wrapper = shallow(Cart, { localVue, store })
    b = new Helpers(wrapper, expect)
  })

  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('show products', () => {
    const $products = wrapper.findAll('.box')
    expect($products.length).toBe(productsInCartState.length)
  })

  it('show amount', () => {
    const amount = calculateAmount(productsInCartState)
    b.see(`Total: $${amount}`, '.total')
  })

  it('show good count of product', () => {
    const countInStore = productsInCartState[0].count
    b.see(`${countInStore}`, '.box:first-of-type .itemCount')
  })

  it('can remove product', () => {
    b.domHas('.box:first-of-type .removeItem')

    b.click('.box:first-of-type .removeItem')

    const productsInCartStore = Object.values(fakeStore.modules.cart.state.cart)
    const $upProducts = wrapper.findAll('.box')
    expect($upProducts.length).toBe(productsInCartStore.length)

    const amount = calculateAmount(Object.values(cartModule.state.cart))
    b.see(`Total: $${amount}`, '.total')
  })
})
