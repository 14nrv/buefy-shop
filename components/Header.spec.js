import { shallow } from 'vue-test-utils'
import Helpers from 'mwangaben-vthelpers'
import Header from '@/components/Header.vue'

let wrapper, b

const isActive = '.is-active'
const navbarBurger = '.navbar-burger'
const navbarBurgerIsActive = `${navbarBurger}${isActive}`
const navbarMenu = '.navbar-menu'
const navbarMenuIsActive = `${navbarMenu}${isActive}`

describe('Index', () => {
  beforeEach(() => {
    wrapper = shallow(Header)
    b = new Helpers(wrapper, expect)
  })

  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
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
