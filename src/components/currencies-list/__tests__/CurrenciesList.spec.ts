import { shallowMount } from '@vue/test-utils'
import CurrenciesList from '../CurrenciesList.vue'
import CurrencySelect from '@/components/shared/CurrencySelect.vue'

/**
 * NOTE: `const defaultOptions: any` - any type has been added in order to fix typings issue in runtime
 * This workaround decribed here: https://github.com/vuejs/test-utils/issues/194#issuecomment-694167869
 */
const defaultOptions: any = {
  props: {
    baseCurrency: 'USD',
    symbols: [],
    rates: [],
    loading: false
  }
}

describe('CurrenciesList.vue', () => {
  describe('Rendering', () => {
    it('should renders correctly', () => {
      const wrapper = shallowMount(CurrenciesList, defaultOptions)
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe('Functional', () => {
    it('custom event @update:value should be handled correct', () => {
      const wrapper = shallowMount(CurrenciesList, defaultOptions)

      const handleSwitchCurrenciesTriggerElement = wrapper.findComponent(CurrencySelect)
      const updatedData = 'EUR'
      handleSwitchCurrenciesTriggerElement.vm.$emit('update:value', updatedData)

      const changeBaseCurrencyEvent = wrapper.emitted('base-currency-changed')
      expect(changeBaseCurrencyEvent).toHaveLength(1)
      expect((changeBaseCurrencyEvent as unknown[])[0]).toEqual([updatedData])
    })
  })
})
