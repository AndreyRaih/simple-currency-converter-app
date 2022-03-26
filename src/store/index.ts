import CurrencyService from '@/services/CurrencyService'
import { ConversionQuery, ConversionResult, CurrencyApi } from '@/typings'
import { mapConversionResponseToConversionResult } from '@/utils/formatter'
import { createStore } from 'vuex'
const CurrencyServiceInstance = new CurrencyService()

interface CurrencyState {
  symbols: { [key: string]: string };
  conversionQuery: ConversionQuery;
  conversionResult: ConversionResult | null;
  rates: { [key: string]: number }
}

export default createStore<CurrencyState>({
  state: {
    symbols: {},
    conversionQuery: {
      from: 'USD',
      to: 'EUR',
      amount: 1
    },
    conversionResult: null,
    rates: {}
  },
  getters: {
    baseCurrency: (state) => state.conversionQuery.from,
    symbolsList: (state) => Object.entries(state.symbols).map(([key, value]) => ({ key, value })),
    ratesList: (state) => Object.entries(state.rates).map(([key, value]) => ({ key, value }))
  },
  mutations: {
    SET_SYMBOLS (state, symbols: { [key: string]: string }): void {
      state.symbols = symbols
    },
    CHANGE_CONVERSION_FROM (state, value: string): void {
      state.conversionQuery.from = value
    },
    SET_CONVERSION_QUERY (state, queryObj: ConversionQuery): void {
      state.conversionQuery = queryObj
    },
    SET_CONVERSION_RESULT (state, result: ConversionResult | null): void {
      state.conversionResult = result
    },
    SET_RATES (state, rates: { [key: string]: number }): void {
      state.rates = rates
    }
  },
  actions: {
    getSymbols ({ commit }): Promise<void> {
      return CurrencyServiceInstance.getSymbols().then(({ symbols }) => commit('SET_SYMBOLS', symbols))
    },
    getRatesByCurrency ({ commit }, currency): Promise<void> {
      return CurrencyServiceInstance.getRecentExchangeRatesByCurrency(currency).then(({ rates }) => commit('SET_RATES', rates))
    },
    convertByConversionQuery ({ commit, state }, converterFormData): Promise<void> {
      commit('SET_CONVERSION_QUERY', converterFormData)
      return CurrencyServiceInstance.convert(state.conversionQuery).then((conversion: CurrencyApi.Response.Conversion) => commit('SET_CONVERSION_RESULT', <ConversionResult>mapConversionResponseToConversionResult(conversion, state.symbols)))
    }
  }
})
