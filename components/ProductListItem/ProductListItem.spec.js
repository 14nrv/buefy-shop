import Vuex from 'vuex'
import matchers from 'jest-vue-matcher'
import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import fakeStore from '@/__mocks__/fakeStore'
import products from '@/__mocks__/products.json'
import ProductListItem from './ProductListItem'

jest.mock('@/plugins/firebase', () => jest.fn())

const firstProduct = products[0]

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper, store

describe('ProductListItem', () => {
  beforeEach(() => {
    store = new Vuex.Store(fakeStore)
    wrapper = shallowMount(ProductListItem, {
      localVue,
      store,
      propsData: {
        item: firstProduct
      },
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
    expect.extend(matchers(wrapper))
  })

  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('have a btn .add', () => {
    expect('.add').toBeADomElement()
  })

  it('show name of item', () => {
    expect('.media-content p.title').toHaveText(firstProduct.name)
  })

  it('show price of item', () => {
    expect('.item-price').toHaveText(`$${firstProduct.price}`)
  })

  it('call addItem action when click on btn item', () => {
    const getCartTotalInStore = () => wrapper.vm.$store.getters['cart/total']
    const getCartAmountInStore = () => wrapper.vm.$store.getters['cart/amount']
    expect(getCartTotalInStore()).toBe(0)
    expect(getCartAmountInStore()).toBeFalsy()

    wrapper.find('.add').trigger('click')
    expect(getCartTotalInStore()).toBe(1)
    expect(getCartAmountInStore()).toBeTruthy()
  })
})
