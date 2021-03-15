import Vuex from 'vuex'
import matchers from 'jest-vue-matcher'
import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import fakeStore from '@/__mocks__/fakeStore'
import Cart from '@/pages/cart'

jest.mock('@/plugins/firebase', () => jest.fn())

const localVue = createLocalVue()
localVue.component('ValidationProvider', ValidationProvider)
localVue.component('ValidationObserver', ValidationObserver)
localVue.use(Vuex)

let wrapper, store

const calculateAmount = array =>
  array
    .reduce((acc, { count, price }) => acc + (count * price), 0)
    .toFixed(2)

const firstProduct = {
  article: 'shoe',
  category: 'women',
  count: 1,
  img: 'shoe1.png',
  name: 'Khaki Suede Polish Work Boots',
  price: 149.99,
  sale: true
}
const secondProduct = {
  article: 'jacket',
  category: 'women',
  count: 1,
  img: 'jacket1.png',
  name: 'Camo Fang Backpack Jungle',
  price: 39.99,
  sale: false
}

describe('Cart', () => {
  beforeEach(() => {
    store = new Vuex.Store(fakeStore)
    wrapper = mount(Cart, {
      localVue,
      store,
      stubs: {
        NuxtLink: RouterLinkStub,
        card: true
      }
    })
    expect.extend(matchers(wrapper))

    store.dispatch('cart/addItem', firstProduct)
    store.dispatch('cart/addItem', firstProduct)
    store.dispatch('cart/addItem', secondProduct)
  })

  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('show products', () => {
    const $products = wrapper.findAll('.box')
    expect($products).toHaveLength(2)
  })

  it('show amount', () => {
    const amount = calculateAmount([firstProduct, firstProduct, secondProduct])
    expect('.total').toHaveText(`Total: $${amount}`)
  })

  it('show good count of product', () => {
    const firstProductInCartCount = Object.values(store.getters['cart/cart'])[0].count
    expect('.box:first-of-type .itemCount').toHaveText(firstProductInCartCount)
  })

  it('can remove product', async () => {
    const firstBoxRemoveItemBtn = '.box:first-of-type .removeItem'

    const getDomProducts = () => wrapper.findAll('.box')
    const getProductsInCartStore = () => Object.values(store.getters['cart/cart'])

    const beforeClick = {
      domProducts: getDomProducts(),
      productsInCartStore: getProductsInCartStore()
    }
    expect(beforeClick.domProducts).toHaveLength(beforeClick.productsInCartStore.length)
    wrapper.find(firstBoxRemoveItemBtn).trigger('click')

    await wrapper.vm.$nextTick()

    const afterClick = {
      domProducts: getDomProducts(),
      productsInCartStore: getProductsInCartStore()
    }
    expect(afterClick.domProducts).toHaveLength(afterClick.productsInCartStore.length)
    expect(beforeClick.domProducts).not.toHaveLength(afterClick.productsInCartStore.length)
    expect(afterClick.domProducts).toHaveLength(beforeClick.productsInCartStore.length - 1)

    const amount = calculateAmount(getProductsInCartStore())
    expect('.total').toHaveText(`Total: $${amount}`)
  })

  it('show a btn for adding product if no product in cart', async () => {
    await store.dispatch('cart/setTotal', 0)
    await wrapper.vm.$nextTick()
    expect('.empty a button').toBeADomElement()
    expect('.button').toHaveText('Fill er up!')
  })

  it('can move from step 1 to step 2', async () => {
    await wrapper.vm.setActualStep(1)
    wrapper.vm.$root.$emit('formSubmitted', { values: {} })

    expect(wrapper.vm.actualStep).toBe(2)
  })

  it('reset cart after leaving success section', async () => {
    await wrapper.vm.setSuccess(true)
    await wrapper.vm.setActualStep(3)

    await store.dispatch('cart/setTotal', 0)
    await wrapper.vm.$nextTick()

    const $stepItemActive = '.step-item.is-active'
    expect($stepItemActive).toHaveText('Confirmation')

    expect('a button').toBeADomElement()
    expect('h2').toHaveText('Success')

    wrapper.destroy()

    const { success, actualStep } = wrapper.vm
    expect(success).toBeFalsy()
    expect(actualStep).toBe(0)
  })

  it('change actualStep on destroy', async () => {
    await wrapper.vm.setActualStep(1)

    wrapper.destroy()

    expect(wrapper.vm.actualStep).toBe(0)
  })
})
