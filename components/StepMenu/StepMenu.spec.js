import Helpers from 'mwangaben-vthelpers'
import { shallow } from '@vue/test-utils'
import StepMenu from './StepMenu'
import stepMenuContent from './stepMenuContent.json'

const STEP_ITEM_CLASS = '.step-item'
const FIRST_STEP_ITEM = `${STEP_ITEM_CLASS}:first-of-type`

let wrapper, b

describe('StepMenu', () => {
  beforeEach(() => {
    wrapper = shallow(StepMenu, {
      propsData: {
        actualStep: 0,
        menu: stepMenuContent
      }
    })
    b = new Helpers(wrapper, expect)
  })

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('have a prop actualStep & menu', () => {
    expect(wrapper.props('actualStep', 0)).toBeTruthy()
    expect(wrapper.props('menu', 0)).toBeTruthy()
  })

  it('have same steps as data menu', () => {
    b.domHas(STEP_ITEM_CLASS)

    const stepItemLength = wrapper.findAll(STEP_ITEM_CLASS).length
    expect(wrapper.vm.menu).toHaveLength(stepItemLength)
  })

  it('have first step active', () => {
    const ACTIVE_CLASSNAME = 'is-active'
    const $firstStepItem = b.find(FIRST_STEP_ITEM)
    expect($firstStepItem.element.classList.contains(ACTIVE_CLASSNAME)).toBeTruthy()

    const stepItemActiveLength = wrapper.findAll(`${STEP_ITEM_CLASS}.${ACTIVE_CLASSNAME}`).length
    expect(stepItemActiveLength).toBe(1)
  })

  it('have same content as menu', () => {
    const { title, icon } = wrapper.vm.menu[0]

    b.see(title, FIRST_STEP_ITEM)
    b.domHas(`${FIRST_STEP_ITEM} .${icon}`)
  })
})
