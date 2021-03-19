import Vuex from 'vuex'
import matchers from 'jest-vue-matcher'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import fakeStore from '@/__mocks__/fakeStore'
import Sidebar from './Sidebar'

jest.mock('@/plugins/firebase', () => jest.fn())

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper, store

describe('Sidebar', () => {
  const wGetters = getterName => wrapper.vm.$store.getters[getterName]

  beforeEach(() => {
    store = new Vuex.Store(fakeStore)
    wrapper = shallowMount(Sidebar, { localVue, store })
    expect.extend(matchers(wrapper))
  })

  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('show an input #pricerange', () => {
    expect('input#pricerange').toBeADomElement()
  })

  it('call updateHighPrice when change value of price range', () => {
    const highPriceInStore = () => wGetters('product/highprice')
    expect(highPriceInStore()).toBe(300)

    const highPrice = 20
    wrapper.find('#pricerange').setValue(highPrice)

    expect(highPriceInStore()).toBe(`${highPrice}`)
  })

  it('show an select #category', () => {
    expect('select#category').toBeADomElement()
  })

  it('have all category selected', () => {
    const categorySelected = wGetters('product/categorySelected')
    expect(categorySelected).toBe('all')
  })
})
