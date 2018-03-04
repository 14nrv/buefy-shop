import Vuex from 'vuex'
import axios from 'axios'
import VeeValidate from 'vee-validate'
import Helpers from 'mwangaben-vthelpers'
import { mount, createLocalVue } from 'vue-test-utils'
import fakeStore from '@/__tests__/__mocks__/fakeStore'
import Checkout from '@/components/Checkout'

jest
  .mock('vue-stripe-elements-plus', () => ({
    createToken: jest.fn(() => Promise.resolve({ token: 'myAwesomeToken' }))
  }))
  .mock('@/plugins/firebase', () => jest.fn())

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VeeValidate)

const TOTAL = 100
const INPUT_TYPE_EMAIL_VALUE = 'test@aol.fr'

let wrapper, store, b

describe('Checkout', () => {
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
    b.domHas('.pay-with-stripe[disabled=disabled]')
  })

  it('is not submitted, complete and success by default', () => {
    expect(wrapper.vm.submitted).toBeFalsy()
    expect(wrapper.vm.complete).toBeFalsy()
    expect(wrapper.vm.success).toBeFalsy()
  })

  it('can pay', async () => {
    const successSubmitStub = jest.fn()
    wrapper.vm.$on('successSubmit', successSubmitStub)

    wrapper.setData({ 'complete': true })
    b.type(INPUT_TYPE_EMAIL_VALUE, 'input[type=email]')
    b.domHasNot('.pay-with-stripe[disabled=disabled]')

    await wrapper.vm.pay()

    expect(wrapper.vm.submitted).toBeTruthy()

    const postSecondArgument = {
      stripeEmail: INPUT_TYPE_EMAIL_VALUE,
      stripeToken: 'tok_visa',
      stripeAmt: TOTAL * 100
    }

    expect(axios.post.mock.calls[0][1]).toMatchObject(postSecondArgument)

    expect(wrapper.vm.status).toBe('success')

    expect(successSubmitStub).toBeCalled()
    expect(wrapper.vm.$store.state.cart.total).toBe(0)
    expect(wrapper.vm.$store.state.cart.amount).toBe(0)
  })

  it('put status to failure if form is not valid', async () => {
    wrapper.setData({ 'complete': true })

    b.type('false@email', 'input[type=email]')

    await wrapper.vm.pay()

    expect(axios.post).not.toBeCalled()

    expect(wrapper.vm.status).toBe('failure')
    b.domHas('.statussubmit button')
  })

  it('put status to failure if axios reject', async () => {
    wrapper.setData({ 'complete': true })
    wrapper.setProps({ 'stripeUrl': 'fail' })

    b.type(INPUT_TYPE_EMAIL_VALUE, 'input[type=email]')

    await wrapper.vm.pay()

    expect(wrapper.vm.status).toBe('failure')
    b.domHas('.statussubmit button')
  })

  it('can reset if failure', () => {
    b.domHasNot('.statussubmit')

    wrapper.setData({
      'submitted': true,
      'status': 'failure'
    })

    b.domHasNot('.loadcontain')
    b.domHasNot('.payment')
    b.domHas('.statussubmit')

    b.click('.statussubmit button')
    expect(wrapper.vm.submitted).toBeFalsy()
    expect(wrapper.vm.status).toBe('')
  })
})
