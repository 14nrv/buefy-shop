import Vuex from 'vuex'
import { mount, createLocalVue } from 'vue-test-utils'
import { fakeStore } from '@/store/__mocks__/fakeStore'
import pkg from '@/package.json'
import Index from './index'
import Card from '@/components/Card.vue'
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

const ITEM_CLASS_NAME = '.card'
let wrapper
let store

describe('Index', () => {
  beforeEach(() => {
    store = new Vuex.Store(fakeStore)
    wrapper = mount(Index, { localVue, store })
  })

  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('have a card & header components', () => {
    expect(wrapper.contains(Card)).toBeTruthy()
    expect(wrapper.contains(Header)).toBeTruthy()
    expect(wrapper.contains(Sidebar)).toBeTruthy()

    const $Sidebar = wrapper.find(Sidebar)
    expect($Sidebar.is(Sidebar)).toBe(true)
  })

  it('have pkg version in store', () => {
    const pkgVersionInStore = wrapper.vm.$store.getters['pkg/version']
    expect(pkgVersionInStore).toBe(pkg.version)
  })

  describe('> card', () => {
    it('show all products', () => {
      const $products = wrapper.findAll(ITEM_CLASS_NAME)
      const products = wrapper.vm.$store.getters['product/products']
      const allProducts = wrapper.vm.$store.getters['product/allProducts']

      expect(wrapper.contains(ITEM_CLASS_NAME)).toBeTruthy()
      expect($products.length).toBe(products.length)
      expect($products.length).toBe(allProducts.length)
    })

    it('don t show .cartcount by default', () => {
      const cartTotalInStore = wrapper.vm.$store.getters['cart/total']
      expect(cartTotalInStore).toBeFalsy()
      expect(wrapper.contains('.cartcount')).toBeFalsy()
    })

    it('update cart when click on btn add to cart', () => {
      const cartTotalInStore = wrapper.vm.$store.getters['cart/total']
      expect(cartTotalInStore).toBeFalsy()

      const firstProduct = wrapper.findAll(ITEM_CLASS_NAME).at(0)
      const $btn = firstProduct.find('.add')
      $btn.trigger('click')
      $btn.trigger('click')

      expect(fakeStore.modules.cart.actions.addItem).toHaveBeenCalledTimes(2)
      expect(fakeStore.modules.cart.state.total).toBe(2)
    })

    it('update when is sale or not', () => {
      wrapper.find('.can-toggle input').trigger('click')
      const highPrice = 20

      const $pricerange = wrapper.find('#pricerange')
      $pricerange.element.value = highPrice
      $pricerange.trigger('input')

      expect(fakeStore.modules.product.actions.updateHighprice).toHaveBeenCalledTimes(1)
    })
  })
})
