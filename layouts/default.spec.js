import matchers from 'jest-vue-matcher'
import { shallowMount } from '@vue/test-utils'
import Default from '@/layouts/default'

let wrapper

describe('Default', () => {
  beforeEach(() => {
    wrapper = shallowMount(Default, {
      stubs: {
        nuxt: true
      }
    })
    expect.extend(matchers(wrapper))
  })

  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('have a hero style', () => {
    const $hero = '.hero'

    expect($hero).toBeADomElement()
    expect(`${$hero}-head`).toBeADomElement()
    expect(`${$hero}-body`).toBeADomElement()
    expect(`${$hero}-footer`).toBeADomElement()
  })
})
