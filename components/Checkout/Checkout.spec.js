import Vuex from 'vuex'
import axios from 'axios'
import matchers from 'jest-vue-matcher'
import { mount, createLocalVue } from '@vue/test-utils'
import fakeStore from '@/__mocks__/fakeStore'
import Checkout from './Checkout'

jest
  .mock('vue-stripe-elements-plus', () => ({
    createToken: jest.fn(() => Promise.resolve({ token: { id: 'myAwesomeToken' } }))
  }))
  .mock('@/plugins/firebase', () => jest.fn())

const localVue = createLocalVue()
localVue.use(Vuex)

const TOTAL = 100

const $statusFailure = '.statusFailure'
const $statusFailureButton = '.statusFailure button'
const $payWithStripe = '.pay-with-stripe'

let wrapper, store

describe('Checkout', () => {
  const wGetters = getterName => wrapper.vm.$store.getters[getterName]

  beforeEach(() => {
    store = new Vuex.Store(fakeStore)
    wrapper = mount(Checkout, {
      stubs: {
        card: true
      },
      propsData: {
        total: TOTAL
      },
      localVue,
      store
    })

    expect.extend(matchers(wrapper))

    jest.resetModules()
    jest.clearAllMocks()
  })

  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('show a btn pay disabled by default', () => {
    expect($payWithStripe).toHaveAttribute('disabled', 'disabled')
  })

  it('is not submitted, complete and success by default', () => {
    const { isStripeCardCompleted, status, isLoading } = wrapper.vm
    expect(isStripeCardCompleted).toBe(false)
    expect(status).toBe(undefined)
    expect(isLoading).toBe(false)
  })

  it('can pay', async () => {
    const SHIPPING_INFORMATION = {
      email: 'labas@aol.be'
    }

    await store.dispatch('checkout/setIsStripeCardCompleted', true)
    await store.dispatch('cart/setShippingInformation', SHIPPING_INFORMATION)

    expect($payWithStripe).toHaveAttribute('disabled', undefined)

    await wrapper.vm.beforePay()

    const isSubmittedInStore = wGetters('checkout/isSubmitted')
    expect(isSubmittedInStore).toBeTruthy()

    const postSecondArgument = {
      userData: SHIPPING_INFORMATION,
      stripeToken: 'myAwesomeToken',
      stripeAmt: TOTAL * 100
    }

    expect(axios.post.mock.calls[0][1]).toMatchObject(postSecondArgument)

    expect(wrapper.vm.status).toBe('success')

    const actualStepInStore = wGetters('cart/actualStep')
    expect(actualStepInStore).toBe(3)

    const { total, amount } = wrapper.vm.$store.state.cart
    expect(total).toBe(0)
    expect(amount).toBe(0)
  })

  it('put status to failure if axios reject', async () => {
    await store.dispatch('checkout/setStatus', undefined) // reset

    await store.dispatch('checkout/setIsStripeCardCompleted', true)
    await store.dispatch('checkout/pay', { url: 'fail' })

    const response = wGetters('checkout/response')
    expect(response).toBeTruthy()

    expect(wrapper.vm.status).toBe('failure')
    expect($statusFailureButton).toBeADomElement()
  })

  it('can reset if failure', async () => {
    await store.dispatch('checkout/setStatus', undefined) // reset

    expect($statusFailure).not.toBeADomElement()

    await store.dispatch('checkout/setStatus', 'failure')

    expect('.loadcontain').not.toBeADomElement()
    expect('.payment').not.toBeADomElement()

    expect($statusFailure).toBeADomElement()

    wrapper.find($statusFailureButton).trigger('click')
    expect(wrapper.vm.submitted).toBeFalsy()
    expect(wrapper.vm.status).toBe('')
  })
})
