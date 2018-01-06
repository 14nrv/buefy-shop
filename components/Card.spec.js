import Vuex from 'vuex'
import Helpers from 'mwangaben-vthelpers'
import { shallow, createLocalVue } from 'vue-test-utils'
import { fakeStore } from '@/store/__mocks__/fakeStore'
import products from '@/store/modules/product'
import Card from './Card'

const firstProduct = products.state.products[0]

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper, store, b

describe('Card', () => {
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
