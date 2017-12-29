import { shallow, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import { fakeStore } from '@/store/__mocks__/fakeStore'
import Switch from './Switch'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store

// fakeStore.modules.product.actions = {

// }

describe('Switch', () => {
  beforeEach(() => {
    store = new Vuex.Store(fakeStore)
    wrapper = shallow(Switch, { localVue, store })
  })

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('don t enable show sale items by default', () => {
    const showSale = wrapper.vm.$store.getters['product/showSale']
    expect(showSale).toBeFalsy()
  })

  it('show a input with a class of .can-toggle', () => {
    expect(wrapper.contains('.can-toggle input')).toBe(true)
  })

  it('call switchSale actions when trigger .can-toggle input', () => {
    expect(fakeStore.modules.product.state.sale).toBeFalsy()

    wrapper.find('.can-toggle input').trigger('click')
    expect(fakeStore.modules.product.actions.switchSale).toHaveBeenCalledTimes(1)
    expect(fakeStore.modules.product.state.sale).toBeTruthy()
    expect(wrapper.vm.$store.getters['product/showSale']).toBeTruthy()
  })
})
