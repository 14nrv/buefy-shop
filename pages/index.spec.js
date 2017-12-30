import Vuex from 'vuex'
import Helpers from 'mwangaben-vthelpers'
import { mount, createLocalVue } from 'vue-test-utils'
import { fakeStore } from '@/store/__mocks__/fakeStore'
import pkg from '@/package.json'
import Index from './index'
import Card from '@/components/Card.vue'
import Sidebar from '@/components/Sidebar.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

const ITEM_CLASS_NAME = '.card'
let wrapper, store, b

describe('Index', () => {
  beforeEach(() => {
    store = new Vuex.Store(fakeStore)
    wrapper = mount(Index, { localVue, store })
    b = new Helpers(wrapper, expect)
  })

  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('have a card & header components', () => {
    b.domHas(Card)
    b.domHas(Sidebar)

    const $Sidebar = wrapper.find(Sidebar)
    expect($Sidebar.is(Sidebar)).toBe(true)
  })

  it('have pkg version in store', () => {
    const pkgVersionInStore = wrapper.vm.$store.getters['pkg/version']
    expect(pkgVersionInStore).toBe(pkg.version)
  })

  describe('> card', () => {
    it('show all products', () => {
      const $products = wrapper.findAll(ITEM_CLASS_NAME).length
      const products = wrapper.vm.$store.getters['product/products'].length
      const allProducts = wrapper.vm.$store.getters['product/allProducts'].length

      b.domHas(ITEM_CLASS_NAME)

      expect($products).toBe(products)
      expect($products).toBe(allProducts)
    })

    it('don t show .cartcount by default', () => {
      const cartTotalInStore = wrapper.vm.$store.state.cart.total
      expect(cartTotalInStore).toBeFalsy()
      b.domHasNot('.cartcount')
    })

    it('update cart when click on btn add to cart', () => {
      const getCartTotalInStore = () => wrapper.vm.$store.getters['cart/total']
      expect(getCartTotalInStore()).toBeFalsy()

      b.click(`${ITEM_CLASS_NAME}:first-of-type .add`)
      b.click(`${ITEM_CLASS_NAME}:first-of-type .add`)

      expect(getCartTotalInStore()).toBe(2)
    })

    it('update when is sale or not', () => {
      const getProductsInDom = () => wrapper.findAll(ITEM_CLASS_NAME).length
      const getProductsInStore = () => wrapper.vm.$store.getters['product/products'].length
      const productsInDomBefore = getProductsInDom()

      expect(getProductsInStore()).toBe(productsInDomBefore)

      b.click('.can-toggle input')
      const highPrice = 20
      b.type(highPrice, '#pricerange')

      const productsInDomAfter = getProductsInDom()
      expect(productsInDomBefore).not.toBe(productsInDomAfter)

      const productsUnderPrice = 1
      expect(productsInDomAfter).toBe(productsUnderPrice)
      expect(getProductsInStore()).toBe(productsUnderPrice)
    })
  })
})
