import { LOCAL_STORAGE_CURRENCY_QUERY_KEY } from '@/components/shared/constants'
import { ConversionQuery } from '@/typings'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useLocalStorage } from './useLocalStorage'

export function useCurrency () {
  const store = useStore()
  const storage = useLocalStorage()

  const initialiseAppCurrencyData = (): Promise<void> => {
    const savedConversionQuery = restoreConversionQuery()
    if (savedConversionQuery) store.commit('SET_CONVERSION_QUERY', savedConversionQuery)
    return store.dispatch('getSymbols')
  }
  const saveConversionQuery = (storedConversionQuery: ConversionQuery) => storage.setData(LOCAL_STORAGE_CURRENCY_QUERY_KEY, storedConversionQuery)
  const restoreConversionQuery = (): ConversionQuery | null => storage.getData(LOCAL_STORAGE_CURRENCY_QUERY_KEY)

  const convert = (conversionQuery: ConversionQuery) => {
    saveConversionQuery(conversionQuery)
    return store.dispatch('convertByConversionQuery', conversionQuery)
  }
  const clearResult = () => store.commit('SET_CONVERSION_RESULT', null)
  const changeBaseCurrency = (currencyCode: string) => {
    store.commit('CHANGE_CONVERSION_FROM', currencyCode)
    store.dispatch('getRatesByCurrency', currencyCode)
  }

  return {
    conversionQuery: computed(() => store.state.conversionQuery),
    conversionResult: computed(() => store.state.conversionResult),
    baseCurrency: computed(() => store.getters.baseCurrency),
    symbolsList: computed(() => store.getters.symbolsList),
    ratesList: computed(() => store.getters.ratesList),
    initialiseAppCurrencyData,
    convert,
    clearResult,
    changeBaseCurrency
  }
}
