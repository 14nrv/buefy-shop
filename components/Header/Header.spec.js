import Vuex from 'vuex'
import Helpers from 'mwangaben-vthelpers'
import { mount, createLocalVue } from '@vue/test-utils'
import fakeStore from '@/__tests__/__mocks__/fakeStore'
import Header from './Header'

jest.mock('@/plugins/firebase', () => jest.fn())

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper, b, store

const $route = {
  path: '/',
  name: 'index'
}

describe('Header', () => {
  beforeEach(() => {
    store = new Vuex.Store(fakeStore)
    wrapper = mount(Header, {
      localVue,
      store,
      mocks: {
        $route
      }
    })
    b = new Helpers(wrapper, expect)
  })

  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('put a class on html tag', () => {
    expect(wrapper.vm['$options'].head().htmlAttrs).toHaveProperty('class')
  })

  it('show cartcount if item in cart', async () => {
    const cartcountClassName = '.cartcount'

    b.domHasNot(cartcountClassName)

    const cartTotalInStore = wrapper.vm.$store.state.cart.total
    expect(cartTotalInStore).toBeFalsy()

    await store.dispatch('cart/addItem', '')
    await store.dispatch('cart/addItem', '')

    b.domHas(cartcountClassName)
    const itemInCart = 2
    b.see(itemInCart, cartcountClassName)
  })
})
