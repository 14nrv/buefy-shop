import { shallow, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import { fakeStore } from '@/store/__mocks__/fakeStore'
import Sidebar from './Sidebar'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store

describe('Sidebar', () => {
  beforeEach(() => {
    store = new Vuex.Store(fakeStore)
    wrapper = shallow(Sidebar, { localVue, store })
  })

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('show an input #pricerange', () => {
    expect(wrapper.contains('#pricerange')).toBeTruthy()
  })

  it('call updateHighPrice when change value of price range', () => {
    const highPrice = 20

    const $pricerange = wrapper.find('#pricerange')
    $pricerange.element.value = highPrice
    $pricerange.trigger('input')

    expect(fakeStore.modules.product.actions.updateHighprice).toHaveBeenCalledTimes(1)
  })
})
