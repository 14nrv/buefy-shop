import Vuex from 'vuex'
import Helpers from 'mwangaben-vthelpers'
import { shallow, createLocalVue } from 'vue-test-utils'
import fakeStore from '@/__tests__/__mocks__/fakeStore'
import Switch from './Switch'

jest.mock('@/plugins/firebase', () => jest.fn())

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper, store, b

const $canToggleInput = '.can-toggle input'

describe('Switch', () => {
  beforeEach(() => {
    store = new Vuex.Store(fakeStore)
    wrapper = shallow(Switch, { localVue, store })
    b = new Helpers(wrapper, expect)
  })

  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('don t enable show sale items by default', () => {
    const showSale = wrapper.vm.$store.getters['product/showSale']
    expect(showSale).toBeFalsy()
  })

  it('show a input with a class of .can-toggle', () => {
    b.domHas($canToggleInput)
  })

  it('call switchSale actions when trigger .can-toggle input', () => {
    expect(fakeStore.modules.product.state.sale).toBeFalsy()

    b.click($canToggleInput)

    expect(fakeStore.modules.product.state.sale).toBeTruthy()
    expect(wrapper.vm.$store.getters['product/showSale']).toBeTruthy()
  })
})
