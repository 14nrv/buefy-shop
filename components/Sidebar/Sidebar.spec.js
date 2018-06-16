import Vuex from 'vuex'
import Helpers from 'mwangaben-vthelpers'
import { shallow, createLocalVue } from '@vue/test-utils'
import fakeStore from '@/__mocks__/fakeStore'
import Sidebar from './Sidebar'

jest.mock('@/plugins/firebase', () => jest.fn())

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper, store, b

describe('Sidebar', () => {
  const wGetters = getterName => wrapper.vm.$store.getters[getterName]

  beforeEach(() => {
    store = new Vuex.Store(fakeStore)
    wrapper = shallow(Sidebar, { localVue, store })
    b = new Helpers(wrapper, expect)
  })

  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('show an input #pricerange', () => {
    b.domHas('input#pricerange')
  })

  it('call updateHighPrice when change value of price range', () => {
    const highPriceInStore = () => wGetters('product/highprice')
    expect(highPriceInStore()).toBe(300)

    const highPrice = 20
    b.type(highPrice, '#pricerange')

    expect(highPriceInStore()).toBe(`${highPrice}`)
  })

  it('show an select #category', () => {
    b.domHas('select#category')
  })

  it('have all category selected', () => {
    const categorySelected = wGetters('product/categorySelected')
    expect(categorySelected).toBe('all')
  })
})
