import Vuex from 'vuex'
import axios from 'axios'
import VeeValidate from 'vee-validate'
import Helpers from 'mwangaben-vthelpers'
import { mount, createLocalVue } from '@vue/test-utils'
import fakeStore from '@/__tests__/__mocks__/fakeStore'
import Checkout from './Checkout'

jest
  .mock('vue-stripe-elements-plus', () => ({
    createToken: jest.fn(() => Promise.resolve({ token: { id: 'myAwesomeToken' } }))
  }))
  .mock('@/plugins/firebase', () => jest.fn())

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VeeValidate)

const TOTAL = 100
const INPUT_TYPE_EMAIL_VALUE = 'test@aol.fr'

const $inputEmail = 'input[type=email]'
const $statusFailure = '.statusFailure'
const $statusFailureButton = '.statusFailure button'
const $payWithStripe = '.pay-with-stripe'

let wrapper, store, b

describe('Checkout', () => {
  const wGetters = getterName => wrapper.vm.$store.getters[getterName]

  beforeEach(() => {
    store = new Vuex.Store(fakeStore)
    wrapper = mount(Checkout, {
      propsData: {
        total: TOTAL
      },
      localVue,
      store
    })

    b = new Helpers(wrapper, expect)

    jest.resetModules()
    jest.clearAllMocks()
  })

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('show a btn pay disabled by default', () => {
    const btnPay = b.find($payWithStripe)
    expect(btnPay.attributes().disabled).toBe('disabled')
  })

  it('is not submitted, complete and success by default', () => {
    const { isStripeCardCompleted, status, isLoading } = wrapper.vm
    expect(isStripeCardCompleted).toBe(false)
    expect(status).toBe(undefined)
    expect(isLoading).toBe(false)
  })

  it('can pay', async () => {
    const btnPay = b.find($payWithStripe)

    await store.dispatch('checkout/setIsStripeCardCompleted', true)

    b.type(INPUT_TYPE_EMAIL_VALUE, $inputEmail)

    expect(btnPay.attributes().disabled).toBeFalsy()

    await wrapper.vm.beforePay()

    const isSubmittedInStore = wGetters('checkout/isSubmitted')
    expect(isSubmittedInStore).toBeTruthy()

    const postSecondArgument = {
      stripeEmail: INPUT_TYPE_EMAIL_VALUE,
      stripeToken: 'myAwesomeToken',
      stripeAmt: TOTAL * 100
    }

    expect(axios.post.mock.calls[0][1]).toMatchObject(postSecondArgument)

    expect(wrapper.vm.status).toBe('success')

    const actualStepInStore = wGetters('cart/actualStep')
    expect(actualStepInStore).toBe(2)

    const { total, amount } = wrapper.vm.$store.state.cart
    expect(total).toBe(0)
    expect(amount).toBe(0)
  })

  it('put status to failure if form is not valid', async () => {
    await store.dispatch('checkout/setIsStripeCardCompleted', true)
    wrapper.setData({ userEmail: 'false@email' })

    await wrapper.vm.beforePay()

    expect(axios.post).not.toBeCalled()
    expect(wrapper.vm.status).toBe('failure')

    await wrapper.vm.$nextTick()
    b.domHas($statusFailureButton)
  })

  it('put status to failure if axios reject', async () => {
    await store.dispatch('checkout/setStatus', undefined) // reset

    await store.dispatch('checkout/setIsStripeCardCompleted', true)
    wrapper.setProps({ 'stripeUrl': 'fail' })

    b.type(INPUT_TYPE_EMAIL_VALUE, $inputEmail)
    await wrapper.vm.beforePay()

    const response = wGetters('checkout/response')
    expect(response).toBeTruthy()

    expect(wrapper.vm.status).toBe('failure')
    b.domHas($statusFailureButton)
  })

  it('can reset if failure', async () => {
    await store.dispatch('checkout/setStatus', undefined) // reset

    b.domHasNot($statusFailure)

    await store.dispatch('checkout/setStatus', 'failure')

    b.domHasNot('.loadcontain')
    b.domHasNot('.payment')
    b.domHas($statusFailure)

    b.click($statusFailureButton)
    expect(wrapper.vm.submitted).toBeFalsy()
    expect(wrapper.vm.status).toBe('')
  })
})
