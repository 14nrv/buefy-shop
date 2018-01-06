import { shallow } from 'vue-test-utils'
import CartStep from './CartStep'

let wrapper

describe('CartStep', () => {
  beforeEach(() => {
    wrapper = shallow(CartStep, {
      propsData: {
        actualStep: 0
      }
    })
  })

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
