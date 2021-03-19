import matchers from 'jest-vue-matcher'
import { shallowMount } from '@vue/test-utils'
import StepMenu from './StepMenu'
import stepMenuContent from './stepMenuContent.json'

const STEP_ITEM_CLASS = '.step-item'
const FIRST_STEP_ITEM = `${STEP_ITEM_CLASS}:first-of-type`

let wrapper

describe('StepMenu', () => {
  beforeEach(() => {
    wrapper = shallowMount(StepMenu, {
      propsData: {
        actualStep: 0,
        menu: stepMenuContent
      }
    })
    expect.extend(matchers(wrapper))
  })

  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('have a prop actualStep & menu', () => {
    expect(wrapper.props('actualStep')).toBe(0)
    expect(wrapper.props('menu')).toBeDefined()
  })

  it('have same steps as data menu', () => {
    expect(STEP_ITEM_CLASS).toBeADomElement()

    const stepItemLength = wrapper.findAll(STEP_ITEM_CLASS).length
    expect(wrapper.vm.menu).toHaveLength(stepItemLength)
  })

  it('have first step active', () => {
    const ACTIVE_CLASSNAME = 'is-active'
    expect(FIRST_STEP_ITEM).toHaveClass(ACTIVE_CLASSNAME)

    const stepItemActiveLength = wrapper.findAll(`${STEP_ITEM_CLASS}.${ACTIVE_CLASSNAME}`).length
    expect(stepItemActiveLength).toBe(1)
  })

  it('have same content as menu', () => {
    const { title, icon } = wrapper.vm.menu[0]

    expect(FIRST_STEP_ITEM).toHaveText(title)

    expect(`${FIRST_STEP_ITEM} .${icon}`).toBeADomElement()
  })
})
