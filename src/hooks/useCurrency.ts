import { LOCAL_STORAGE_CURRENCY_QUERY_KEY } from '@/utils/constants'
import { ConversionQuery } from '@/typings'
import { AxiosError } from 'axios'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useErrorHandling } from './useErrorHandling'
import { useLocalStorage } from './useLocalStorage'

export function useCurrency () {
  const store = useStore()
  const storage = useLocalStorage()
  const errorHandling = useErrorHandling()

  const initialiseAppCurrencyData = (): Promise<void> => {
    const savedConversionQuery = restoreConversionQuery()
    if (savedConversionQuery) {
      store.commit('SET_CONVERSION_QUERY', savedConversionQuery)
    }
    return store.dispatch('getSymbols')
  }
  const convert = (conversionQuery: ConversionQuery): Promise<void> => {
    saveConversionQuery(conversionQuery)
    return store.dispatch('convertByConversionQuery', conversionQuery).catch((error: AxiosError) => errorHandling.handleErrorWithMessage(error))
  }
  const changeBaseCurrency = (currencyCode: string): Promise<void> => {
    store.commit('CHANGE_CONVERSION_FROM', currencyCode)
    return store.dispatch('getRatesByCurrency', currencyCode).catch((error: AxiosError) => errorHandling.handleErrorWithMessage(error))
  }

  const clearResult = () => store.commit('SET_CONVERSION_RESULT', null)
  const saveConversionQuery = (storedConversionQuery: ConversionQuery) => storage.setData(LOCAL_STORAGE_CURRENCY_QUERY_KEY, storedConversionQuery)
  const restoreConversionQuery = (): ConversionQuery | null => storage.getData(LOCAL_STORAGE_CURRENCY_QUERY_KEY)

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
