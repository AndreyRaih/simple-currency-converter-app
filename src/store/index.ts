import CurrencyService from '@/services/CurrencyService'
import { ConverterData, ConverterResultData } from '@/typings'
import { createStore } from 'vuex'
const CurrencyServiceInstance = new CurrencyService()

export interface CurrencyState {
  symbols: { [key: string]: string };
  conversionQuery: ConverterData;
  conversionResult: ConverterResultData | null;
  rates: { [key: string]: number }
}

export default createStore<CurrencyState>({
  state: {
    symbols: {},
    conversionQuery: {
      from: 'AED',
      to: 'AFN',
      amount: 5
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
    SET_CONVERSION_QUERY (state, queryObj: ConverterData): void {
      state.conversionQuery = queryObj
    },
    SET_CONVERSION_RESULT (state, result: ConverterResultData | null): void {
      state.conversionResult = result
    },
    SET_RATES (state, rates: { [key: string]: number }): void {
      state.rates = rates
    }
  },
  actions: {
    getSymbols ({ commit }) {
      return CurrencyServiceInstance.getSymbols().then(({ symbols }) => commit('SET_SYMBOLS', symbols))
    },
    getRatesByCurrency ({ commit }, currency) {
      return CurrencyServiceInstance.getRecentExchangeRatesByCurrency(currency).then(({ rates }) => commit('SET_RATES', rates))
    },
    convertByConversionQuery ({ commit, state }, converterFormData) {
      commit('SET_CONVERSION_QUERY', converterFormData)
      return CurrencyServiceInstance.convert(state.conversionQuery).then(conversion => commit('SET_CONVERSION_RESULT', {
        selectedAmount: conversion.query.amount.toString(),
        selectedCurrencyCode: conversion.query.from,
        selectedCurrencyFullName: state.symbols[conversion.query.from],
        convertedAmount: conversion.result.toString(),
        convertedCurrencyCode: conversion.query.to,
        convertedCurrencyFullName: state.symbols[conversion.query.to],
        rate: conversion.info.rate,
        lastUpdateDate: new Date(conversion.info.timestamp).toLocaleDateString()
      } as ConverterResultData))
    }
  }
})
