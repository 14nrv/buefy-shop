import Vuex from 'vuex'
import Helpers from 'mwangaben-vthelpers'
import { shallow, createLocalVue } from 'vue-test-utils'
import fakeStore from '@/__tests__/__mocks__/fakeStore'
import products from '@/__tests__/__mocks__/products.json'
import Card from '@/components/Card'

jest.mock('@/plugins/firebase', () => jest.fn())

const firstProduct = products[0]

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper, store, b

describe.only('Card', () => {
  beforeEach(() => {
    store = new Vuex.Store(fakeStore)
    wrapper = shallow(Card, {
      localVue,
      store,
      propsData: {
        item: firstProduct,
        index: 0
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

  it.skip('show sale', () => {
    b.domHas('.salepill')
    expect(wrapper.contains('.salepill')).toBe(true)
  })

  it('call addItem action when click on btn item', () => {
    const getCartTotalInStore = () => wrapper.vm.$store.getters['cart/total']
    expect(getCartTotalInStore()).toBe(0)

    b.click('.add')
    expect(getCartTotalInStore()).toBe(1)
  })
})
