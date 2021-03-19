import Vuex from 'vuex'
import matchers from 'jest-vue-matcher'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import fakeStore from '@/__mocks__/fakeStore'
import fakeProducts from '@/__mocks__/products.json'
import CartProductListItem from './CartProductListItem'

jest.mock('@/plugins/firebase', () => jest.fn())

const localVue = createLocalVue()
localVue.use(Vuex)

fakeStore.modules.cart.actions = {
  removeItem: jest.fn()
}

let wrapper, store

const firstBoxRemoveItemBtn = '.box .removeItem'

describe('CartProductListItem', () => {
  beforeEach(() => {
    store = new Vuex.Store(fakeStore)
    wrapper = shallowMount(CartProductListItem, {
      localVue,
      store,
      propsData: {
        item: {
          ...fakeProducts[0]
        }
      }
    })
    expect.extend(matchers(wrapper))
  })

  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('have a btn remove', () => {
    expect(firstBoxRemoveItemBtn).toBeADomElement()
  })

  it('call remove item action when click on btn .removeItem', () => {
    wrapper.find(firstBoxRemoveItemBtn).trigger('click')
    expect(fakeStore.modules.cart.actions.removeItem).toHaveBeenCalled()
  })
})
