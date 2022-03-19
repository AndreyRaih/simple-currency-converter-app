import { shallowMount } from '@vue/test-utils'
import ConverterForm from '../ConverterForm.vue'
import Controlls from '../views/Controlls.vue'

const defaultOptions = {
  props: {
    converterData: {
      from: 'USD',
      to: 'EUR',
      amount: 0
    },
    converterResult: {},
    symbols: [],
    loading: false
  }
}

describe('ConverterForm.vue', () => {
  describe('Rendering', () => {
    it('should renders correctly', () => {
      const wrapper = shallowMount(ConverterForm, defaultOptions)
      expect(wrapper.element).toMatchSnapshot()
    })

    it('should renders result section, if converterResult is not falsy or empty', async () => {
      const wrapper = shallowMount(ConverterForm, defaultOptions)
      await wrapper.setProps({ converterResult: { baseAmount: 0, targetAmount: 0 }})
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe('Functional', () => {
    it('props.converterData should be immutable', () => {
      const wrapper = shallowMount(ConverterForm, defaultOptions)
      wrapper.vm.converterFormData.amount++

      expect(wrapper.vm.converterFormData.amount === wrapper.vm.converterData.amount).toBeFalsy()
    })

    it('custom event @switch-currencies should be handled correct', () => {
      const wrapper = shallowMount(ConverterForm, defaultOptions)

      const handleSwitchCurrenciesTriggerElement = wrapper.findComponent(Controlls)
      handleSwitchCurrenciesTriggerElement.vm.$emit('switch-currencies')

      expect(wrapper.vm.converterFormData.from).toBe(defaultOptions.props.converterData.to)
      expect(wrapper.vm.converterFormData.to).toBe(defaultOptions.props.converterData.from)
    })

    it('custom event @convert-currencies should be handled correct', () => {
      const wrapper = shallowMount(ConverterForm, defaultOptions)

      const handleSwitchCurrenciesTriggerElement = wrapper.findComponent(Controlls)
      handleSwitchCurrenciesTriggerElement.vm.$emit('convert-currencies')

      const convertEvent = wrapper.emitted('convert');
      expect(convertEvent).toHaveLength(1)
      expect((convertEvent as unknown[])[0]).toEqual([defaultOptions.props.converterData])
    })
  })
})
