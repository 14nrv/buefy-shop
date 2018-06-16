import Helpers from 'mwangaben-vthelpers'
import { shallow } from '@vue/test-utils'
import Default from '@/layouts/default'

let wrapper, b

describe('Default', () => {
  beforeEach(() => {
    wrapper = shallow(Default)
    b = new Helpers(wrapper, expect)
  })

  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('have a hero style', () => {
    const $hero = '.hero'

    b.domHas($hero)
    b.domHas(`${$hero}-head`)
    b.domHas(`${$hero}-body`)
    b.domHas(`${$hero}-footer`)
  })
})
