import Vuex from 'vuex'
import matchers from 'jest-vue-matcher'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import fakeStore from '@/__mocks__/fakeStore'
import fakeProducts from '@/__mocks__/products.json'
import pkg from '@/package.json'
import ProductDetail from '@/pages/products/_slug'
import { slug } from '@/helpers'

jest.mock('@/plugins/firebase', () => jest.fn())

const $route = {
  params: {
    slug: slug('JSON Khaki Suede Polish Work Boots')
  }
}

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper, store

const [ firstProduct ] = fakeProducts
const fetchError = jest.fn()

describe('ProductDetail', () => {
  const wGetters = getterName => wrapper.vm.$store.getters[getterName]

  beforeEach(() => {
    store = new Vuex.Store(fakeStore)
    wrapper = shallowMount(ProductDetail, {
      localVue,
      store,
      computed: {
        item: () => firstProduct
      },
      mocks: {
        $route
      }
    })
    expect.extend(matchers(wrapper))
  })

  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('have pkg name in store', () => {
    const pkgVersionInStore = wGetters('pkg/name')
    expect(pkgVersionInStore).toBe(pkg.name)
  })

  it('show product details', () => {
    const { name, price } = firstProduct
    expect('h1').toHaveText(name)
    expect('p').toHaveText(price)
  })

  it('can add product to cart', () => {
    const getCartTotalInStore = () => wGetters('cart/total')
    expect(getCartTotalInStore()).toBe(0)

    wrapper.find('.button').trigger('click')
    expect(getCartTotalInStore()).toBe(1)
  })

  it('have a item computed', () => {
    expect(wrapper.vm.item).toBeTruthy()
  })

  it('can find product from slug param', () => {
    const productFromSlugParamRoute = wGetters('product/productFromSlugParamRoute')
    expect(productFromSlugParamRoute($route.params.slug)).toBeTruthy()
  })

  it('have a page title with product name', () => {
    expect(wrapper.vm.$options.head()).toBeDefined()
  })

  it('fetch without error if product param slug is in state', () => {
    wrapper.vm.$options.fetch({ store, params: $route.params, error: fetchError })
    expect(fetchError).not.toHaveBeenCalled()
  })

  it('fetch with error if product param slug is not in state', () => {
    const params = { slug: slug('product slug not in state') }
    wrapper.vm.$options.fetch({ store, params, error: fetchError })
    expect(fetchError).toHaveBeenCalled()
  })
})
