import Vuex from 'vuex'
import matchers from 'jest-vue-matcher'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import fakeStore from '@/__mocks__/fakeStore'
import Switch from './Switch'

jest.mock('@/plugins/firebase', () => jest.fn())

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper, store

const $canToggleInput = '.can-toggle input'

describe('Switch', () => {
  beforeEach(() => {
    store = new Vuex.Store(fakeStore)
    wrapper = shallowMount(Switch, { localVue, store })
    expect.extend(matchers(wrapper))
  })

  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('don t enable show sale items by default', () => {
    const showSale = wrapper.vm.$store.getters['product/showSale']
    expect(showSale).toBeFalsy()
  })

  it('show a input with a class of .can-toggle', () => {
    expect($canToggleInput).toBeADomElement()
  })

  it('call switchSale actions when trigger .can-toggle input', () => {
    expect(fakeStore.modules.product.state().sale).toBeFalsy()

    wrapper.find($canToggleInput).trigger('click')

    expect(wrapper.vm.$store.getters['product/showSale']).toBeTruthy()
  })
})
