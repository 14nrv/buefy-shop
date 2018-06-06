import Helpers from 'mwangaben-vthelpers'
import { shallow } from '@vue/test-utils'
import Default from '@/layouts/default'

let wrapper, b

const isExists = selector => {
  const el = selector ? wrapper.find(selector) : wrapper
  return expect(el.exists()).toBeTruthy()
}

describe('Default', () => {
  beforeEach(() => {
    wrapper = shallow(Default)
    b = new Helpers(wrapper, expect)
  })

  it('is a Vue instance', () => {
    isExists()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('have a hero style', () => {
    b.domHas('.hero')
    b.domHas('.hero-head')
    b.domHas('.hero-body')
    b.domHas('.hero-footer')
  })
})
