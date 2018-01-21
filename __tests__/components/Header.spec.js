import Vuex from 'vuex'
import Helpers from 'mwangaben-vthelpers'
import { shallow, createLocalVue } from 'vue-test-utils'
import fakeStore from '@/__tests__/__mocks__/fakeStore'
import Header from '@/components/Header.vue'

jest.mock('@/plugins/firebase', () => jest.fn())

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper, b, store

const isActive = '.is-active'
const navbarBurger = '.navbar-burger'
const navbarBurgerIsActive = `${navbarBurger}${isActive}`
const navbarMenu = '.navbar-menu'
const navbarMenuIsActive = `${navbarMenu}${isActive}`

describe('Header', () => {
  beforeEach(() => {
    store = new Vuex.Store(fakeStore)
    wrapper = shallow(Header, { localVue, store })
    b = new Helpers(wrapper, expect)
  })

  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('put a class on html tag', () => {
    expect(wrapper.vm['$options'].head().htmlAttrs.class).toBe('has-navbar-fixed-top')
  })

  describe('> burger menu', () => {
    it('is inactive by default', () => {
      b.domHas(navbarBurger)
      b.domHasNot(navbarBurgerIsActive)
      b.domHasNot(navbarMenuIsActive)
    })

    it('toggle class is-active when isBurgerMenuActive is true', () => {
      b.domHasNot(navbarBurgerIsActive)

      wrapper.setData({ isBurgerMenuActive: true })

      b.domHas(navbarBurgerIsActive)
      b.domHas(navbarMenuIsActive)
    })

    it('toggle class is-active when click on it', () => {
      b.domHasNot(navbarBurgerIsActive)
      b.domHasNot(navbarMenuIsActive)

      b.click(navbarBurger)

      b.domHas(navbarBurgerIsActive)
      b.domHas(navbarMenuIsActive)
    })
  })
})
