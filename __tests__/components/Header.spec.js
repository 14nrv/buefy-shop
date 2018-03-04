import Vuex from 'vuex'
import Helpers from 'mwangaben-vthelpers'
import { shallow, createLocalVue } from 'vue-test-utils'
import fakeStore from '@/__tests__/__mocks__/fakeStore'
import Header from '@/components/Header.vue'

jest.mock('@/plugins/firebase', () => jest.fn())

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper, b, store

describe('Header', () => {
  beforeEach(() => {
    store = new Vuex.Store(fakeStore)
    wrapper = shallow(Header, { localVue, store })
    b = new Helpers(wrapper, expect)
  })

  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('put a class on html tag', () => {
    expect(wrapper.vm['$options'].head().htmlAttrs.class).toBe('has-navbar-fixed-top')
  })

  it('show cartcount if item in cart', () => {
    const itemInCart = 2

    b.domHasNot('.cartcount')

    wrapper.setComputed({
      'total': itemInCart
    })

    b.domHas('.cartcount')
    b.see(itemInCart, '.cartcount')
  })
})
