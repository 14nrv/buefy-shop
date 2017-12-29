import Vuex from 'vuex'
import { shallow, createLocalVue } from 'vue-test-utils'
import { fakeStore } from '@/store/__mocks__/fakeStore'
import products from '@/store/modules/product'
import Card from './Card'

const firstProduct = products.state.products[0]

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store

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
  })

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('have a btn .add', () => {
    expect(wrapper.contains('.add')).toBe(true)
  })

  it('show name of item', () => {
    const $itemName = wrapper.find('.media-content p.title')
    expect($itemName.text()).toBe(firstProduct.name)
  })

  it('show price of item', () => {
    const $itemPrice = wrapper.find('.item-price')
    expect($itemPrice.text()).toBe(`$${firstProduct.price}`)
  })

  it('call addItem action when click on btn item', () => {
    const $btn = wrapper.find('.add')
    $btn.trigger('click')

    expect(fakeStore.modules.cart.actions.addItem).toHaveBeenCalledTimes(1)
  })
})
