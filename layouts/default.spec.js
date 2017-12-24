import { shallow } from 'vue-test-utils'
import Default from './default'
import Header from '@/components/Header'

let wrapper

const isExists = selector => {
  const el = selector ? wrapper.find(selector) : wrapper
  return expect(el.exists()).toBeTruthy()
}

describe('Default', () => {
  beforeEach(() => {
    wrapper = shallow(Default)
  })

  it('is a Vue instance', () => {
    isExists()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('have a header component', () => {
    expect(wrapper.contains(Header)).toBeTruthy()
  })

  it('have a hero style', () => {
    isExists('.hero')
    isExists('.hero-head')
    isExists('.hero-body')
    isExists('.hero-footer')
  })
})
