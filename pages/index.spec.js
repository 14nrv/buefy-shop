import { shallow } from 'vue-test-utils'
import Index from './index'

let wrapper

describe('Index', () => {
  beforeEach(() => {
    wrapper = shallow(Index)
  })

  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
