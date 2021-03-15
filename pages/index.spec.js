import Vuex from 'vuex'
import matchers from 'jest-vue-matcher'
import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import fakeStore from '@/__mocks__/fakeStore'
import pkg from '@/package.json'
import Index from '@/pages/index'
import ProductListItem from '@/components/ProductListItem'
import Sidebar from '@/components/Sidebar'

jest.mock('@/plugins/firebase', () => jest.fn())

const localVue = createLocalVue()
localVue.use(Vuex)

const ITEM_CLASS_NAME = '.card'
const $category = '#category'

let wrapper, store

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
    wrapper = mount(Index, {
      localVue,
      store,
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
    expect.extend(matchers(wrapper))
  })

  it('run test on test env', () => {
    expect(process.env.NODE_ENV).toBe('test')
  })

  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('have pkg version in store', () => {
    const pkgVersionInStore = wGetters('pkg/version')
    expect(pkgVersionInStore).toBe(pkg.version)
  })

  describe('> sidebar', () => {
    it('have a sidebar component', () => {
      expect(wrapper.getComponent(Sidebar)).toBeTruthy()
    })

    it('bind select option to category in store', () => {
      const $option = wrapper.findAll(`${$category} option`)
      const categoriesInStore = wGetters('product/categories')
      expect(categoriesInStore.includes('all')).toBeTruthy()
      expect($option).toHaveLength(categoriesInStore.length)
    })

    it('update products when change category', async () => {
      const productsInDomBefore = getProductsInDom()

      const categorySelected = () => wGetters('product/categorySelected')
      wrapper.findAll(`${$category} option`).at(4).element.selected = true
      wrapper.find($category).trigger('input')
      await wrapper.vm.$nextTick()

      expect(categorySelected()).toBe('shoe')

      const productsInDomAfter = getProductsInDom()
      expect(productsInDomBefore).not.toBe(productsInDomAfter)

      const productInShoeCategory = 1
      expect(productsInDomAfter).toBe(productInShoeCategory)

      resetCategoryToAll()
    })
  })

  describe('> ProductListItem', () => {
    it('have a ProductListItem component', () => {
      expect(wrapper.getComponent(ProductListItem)).toBeTruthy()
    })

    it('show all products', () => {
      const $products = wrapper.findAll(ITEM_CLASS_NAME)
      const productsInState = wrapper.vm.$store.state.product.products
      const products = wGetters('product/products').length
      const allProducts = wGetters('product/allProducts').length

      expect(ITEM_CLASS_NAME).toBeADomElement()

      expect($products).toHaveLength(products)
      expect($products).toHaveLength(allProducts)
      expect(productsInState).toHaveLength(allProducts)
    })

    it('update cart when click on btn add to cart', () => {
      const getCartTotalInStore = () => wGetters('cart/total')
      expect(getCartTotalInStore()).toBeFalsy()

      wrapper.find(`${ITEM_CLASS_NAME}:first-of-type .add`).trigger('click')
      wrapper.find(`${ITEM_CLASS_NAME}:first-of-type .add`).trigger('click')

      expect(getCartTotalInStore()).toBe(2)
    })

    it('update when is sale or not', async () => {
      const productsInDomBefore = getProductsInDom()
      expect(getProductsInStore()).toBe(productsInDomBefore)

      wrapper.find('.can-toggle input').trigger('click')
      store.dispatch('product/switchSale', true)

      const highPrice = 20
      await wrapper.find('#pricerange').setValue(highPrice)

      const productsInDomAfter = getProductsInDom()
      expect(productsInDomBefore).not.toBe(productsInDomAfter)

      const productsUnderPrice = 1
      expect(productsInDomAfter).toBe(productsUnderPrice)
      expect(getProductsInStore()).toBe(productsUnderPrice)
    })
  })
})
