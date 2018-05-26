import Vuex from 'vuex'
import Helpers from 'mwangaben-vthelpers'
import { shallow, createLocalVue } from '@vue/test-utils'
import fakeStore from '@/__tests__/__mocks__/fakeStore'
import fakeProducts from '@/__tests__/__mocks__/products.json'
import CartProductListItem from './CartProductListItem'

jest.mock('@/plugins/firebase', () => jest.fn())

const localVue = createLocalVue()
localVue.use(Vuex)

fakeStore.modules.cart.actions = {
  removeItem: jest.fn()
}

let wrapper, b, store

const firstBoxRemoveItemBtn = '.box .removeItem'

describe('CartProductListItem', () => {
  beforeEach(() => {
    store = new Vuex.Store(fakeStore)
    wrapper = shallow(CartProductListItem, {
      localVue,
      store,
      propsData: {
        item: {
          ...fakeProducts[0]
        }
      }
    })
    b = new Helpers(wrapper, expect)
  })

  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('have a btn remove', () => {
    b.domHas(firstBoxRemoveItemBtn)
  })

  it('call remove item action when click on btn .removeItem', () => {
    b.click(firstBoxRemoveItemBtn)
    expect(fakeStore.modules.cart.actions.removeItem).toHaveBeenCalled()
  })
})
