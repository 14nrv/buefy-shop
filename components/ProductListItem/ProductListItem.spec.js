import Vuex from 'vuex'
import Helpers from 'mwangaben-vthelpers'
import { shallow, createLocalVue } from '@vue/test-utils'
import fakeStore from '@/__tests__/__mocks__/fakeStore'
import products from '@/__tests__/__mocks__/products.json'
import ProductListItem from './ProductListItem'

jest.mock('@/plugins/firebase', () => jest.fn())

const firstProduct = products[0]

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper, store, b

describe('ProductListItem', () => {
  beforeEach(() => {
    store = new Vuex.Store(fakeStore)
    wrapper = shallow(ProductListItem, {
      localVue,
      store,
      propsData: {
        item: firstProduct
      }
    })
    b = new Helpers(wrapper, expect)
  })

  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('have a btn .add', () => {
    b.domHas('.add')
  })

  it('show name of item', () => {
    b.see(firstProduct.name, '.media-content p.title')
  })

  it('show price of item', () => {
    b.see(`$${firstProduct.price}`, '.item-price')
  })

  it('call addItem action when click on btn item', () => {
    const getCartTotalInStore = () => wrapper.vm.$store.getters['cart/total']
    const getCartAmountInStore = () => wrapper.vm.$store.getters['cart/amount']
    expect(getCartTotalInStore()).toBe(0)
    expect(getCartAmountInStore()).toBeFalsy()

    b.click('.add')
    expect(getCartTotalInStore()).toBe(1)
    expect(getCartAmountInStore()).toBeTruthy()
  })
})
