import Vuex from 'vuex'
import matchers from 'jest-vue-matcher'
import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import fakeStore from '@/__mocks__/fakeStore'
import Header from './Header'

jest.mock('@/plugins/firebase', () => jest.fn())

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper, store

const route = {
  path: '/',
  name: 'index'
}

const setup = ({ $route = route } = {}) => {
  store = new Vuex.Store(fakeStore)
  wrapper = mount(Header, {
    localVue,
    store,
    mocks: {
      $route
    },
    stubs: {
      NuxtLink: RouterLinkStub
    }
  })
  expect.extend(matchers(wrapper))
}

describe('Header', () => {
  it('is a Vue instance', () => {
    setup()
    expect(wrapper.exists()).toBeTruthy()
  })

  it('can put a class on html tag', () => {
    expect(wrapper.vm.$options.head().htmlAttrs).toHaveProperty('class')
  })

  it('show cartcount if item in cart', async () => {
    setup()
    const cartcountClassName = '.cartcount'

    expect(cartcountClassName).not.toBeADomElement()

    const cartTotalInStore = wrapper.vm.$store.state.cart.total
    expect(cartTotalInStore).toBeFalsy()

    await store.dispatch('cart/addItem', '')
    await store.dispatch('cart/addItem', '')

    const itemInCart = 2
    expect(cartcountClassName).toBeADomElement()
    expect(cartcountClassName).toHaveText(itemInCart)
  })
})
