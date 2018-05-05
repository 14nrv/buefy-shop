import Vuex from 'vuex'
import Helpers from 'mwangaben-vthelpers'
import { mount, createLocalVue } from 'vue-test-utils'
import fakeStore from '@/__tests__/__mocks__/fakeStore'
import pkg from '@/package.json'
import Index from '@/pages/index'
import Card from '@/components/Card'
import Sidebar from '@/components/Sidebar'

jest.mock('@/plugins/firebase', () => jest.fn())

const localVue = createLocalVue()
localVue.use(Vuex)

const ITEM_CLASS_NAME = '.card'
const $category = '#category'

let wrapper, store, b

describe('Index', () => {
  const wGetters = getterName => wrapper.vm.$store.getters[getterName]
  const getProductsInDom = () => wrapper.findAll(ITEM_CLASS_NAME).length
  const getProductsInStore = () => wGetters('product/products').length

  const resetCategoryToAll = () => {
    wrapper.findAll(`${$category} option`).at(0).element.selected = true
    wrapper.find($category).trigger('input')
  }

  beforeEach(() => {
    store = new Vuex.Store(fakeStore)
    wrapper = mount(Index, { localVue, store })
    b = new Helpers(wrapper, expect)
  })

  it('run test on test env', () => {
    expect(process.env.NODE_ENV).toBe('test')
  })

  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('have pkg version in store', () => {
    const pkgVersionInStore = wGetters('pkg/version')
    expect(pkgVersionInStore).toBe(pkg.version)
  })

  it('call setProductsRef', () => {
    expect(fakeStore.modules.product.actions.setProductsRef).toHaveBeenCalled()
  })

  describe('> sidebar', () => {
    it('have a sidebar component', () => {
      b.domHas(Sidebar)

      const $Sidebar = wrapper.find(Sidebar)
      expect($Sidebar.is(Sidebar)).toBe(true)
    })

    it('bind select option to category in store', () => {
      const $option = wrapper.findAll(`${$category} option`)
      const categoriesInStore = wGetters('product/categories')
      expect(categoriesInStore.includes('all')).toBeTruthy()
      expect($option).toHaveLength(categoriesInStore.length)
    })

    it('update products when change category', () => {
      const productsInDomBefore = getProductsInDom()

      const categorySelected = () => wGetters('product/categorySelected')
      wrapper.findAll(`${$category} option`).at(4).element.selected = true
      wrapper.find($category).trigger('input')

      expect(categorySelected()).toBe('shoe')

      const productsInDomAfter = getProductsInDom()
      expect(productsInDomBefore).not.toBe(productsInDomAfter)

      const productInShoeCategory = 1
      expect(productsInDomAfter).toBe(productInShoeCategory)

      resetCategoryToAll()
    })
  })

  describe('> card', () => {
    it('have a card component', () => {
      b.domHas(Card)
    })

    it('show all products', () => {
      const $products = wrapper.findAll(ITEM_CLASS_NAME)
      const productsInState = wrapper.vm.$store.state.product.products
      const products = wGetters('product/products').length
      const allProducts = wGetters('product/allProducts').length

      b.domHas(ITEM_CLASS_NAME)

      expect($products).toHaveLength(products)
      expect($products).toHaveLength(allProducts)
      expect(productsInState).toHaveLength(allProducts)
    })

    it('update cart when click on btn add to cart', () => {
      const getCartTotalInStore = () => wGetters('cart/total')
      expect(getCartTotalInStore()).toBeFalsy()

      b.click(`${ITEM_CLASS_NAME}:first-of-type .add`)
      b.click(`${ITEM_CLASS_NAME}:first-of-type .add`)

      expect(getCartTotalInStore()).toBe(2)
    })

    it('update when is sale or not', () => {
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
